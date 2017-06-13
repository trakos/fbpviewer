function createDropShadowFilter() {
    DropShadowFilter.sharedCopyFilter = new PIXI.Filter();

    function DropShadowFilter(angle, distance, spread, color, alpha) {
        PIXI.Filter.call(this);

        angle *= Math.PI / 180;
        this.angle = angle;
        this.padding = distance;
        this.distance = distance;
        this.color = color;
        this.padding = distance < 10 ? 10 : distance;
        this.blur = spread;
        this.alpha = alpha;

        this.tintFilter = new PIXI.Filter(
            PIXI.Filter.defaultVertexSrc,
            ['varying vec2 vTextureCoord;',
                'uniform sampler2D uSampler;',
                'uniform float alpha;',
                'uniform vec3 color;',
                'void main(void){',
                '   vec4 sample = texture2D(uSampler, vTextureCoord);',
                '   gl_FragColor = vec4(color, sample.a > 0.0 ? alpha : 0.0);',
                '}'].join("\n")
        );
        this.tintFilter.uniforms.alpha = alpha;
        this.tintFilter.uniforms.color = PIXI.utils.hex2rgb(color);

        this.blurFilter = new PIXI.filters.BlurFilter();
        this.blurFilter.blur = spread;
    }

    DropShadowFilter.prototype = Object.create(PIXI.Filter.prototype);
    DropShadowFilter.prototype.constructor = DropShadowFilter;
    DropShadowFilter.prototype.apply = function (filterManager, input, output) {
        var rt = filterManager.getRenderTarget();
        rt.clear();
        if (!output.root) output.clear();

        rt.transform = new PIXI.Matrix();
        rt.transform.translate(this.distance * Math.cos(this.angle), this.distance * Math.sin(this.angle));
        this.tintFilter.apply(filterManager, input, rt);
        this.blurFilter.apply(filterManager, rt, output);
        DropShadowFilter.sharedCopyFilter.apply(filterManager, input, output);

        rt.transform = null;
        filterManager.returnRenderTarget(rt);
    };

    PIXI.filters.DropShadowFilter = DropShadowFilter;

///////////////////////////////
// Canvas Alpha Mask support //
///////////////////////////////

    var AlphaMask_use_getImageData = !PIXI.CanvasTinter.canUseMultiply;

    function apply_alpha_mask(main_ctx, mask_ctx, w, h, res) {
        var img = main_ctx.getImageData(0, 0, w * res, h * res);
        var mask = mask_ctx.getImageData(0, 0, w * res, h * res);

        var imgdata = img.data;
        var maskdata = mask.data;
        var bufsize = imgdata.length | 0;

        for (var i = 3; i < bufsize; i += 4)
            imgdata[i] = ((imgdata[i] * maskdata[i]) / 255) | 0;

        main_ctx.putImageData(img, 0, 0);
    }

    function allocate_render_texture(texture, renderer, w, h) {
        if (texture == null) {
            return PIXI.RenderTexture.create(w | 0, h | 0, PIXI.settings.SCALE_MODE.DEFAULT, renderer.resolution);
        }

        if (texture.width != w || texture.height != h) {
            // resize broken with resolution != 1
            //texture.resize(w|0, h|0, true);

            texture.destroy();
            return PIXI.RenderTexture.create(w | 0, h | 0, PIXI.settings.SCALE_MODE.DEFAULT, renderer.resolution);
        }
        return texture;
    }

    PIXI.Container.prototype._alphaMask = null;
    PIXI.Container.prototype._canvasFilters = null;

    Object.defineProperties(PIXI.Container.prototype, {
        alphaMask:     {
            get: function () {
                return this._alphaMask;
            },
            set: function (value) {
                if (this._alphaMask === value) {
                    return;
                }

                if (this._alphaMask) {
                    this._alphaMask.renderable = true;
                }

                this._alphaMask = value;

                if (value) {
                    this._alphaMask.renderable = false;
                }

                this._updateFilterHooks();
            }
        },
        canvasFilters: {
            get: function () {
                return this._canvasFilters && this._canvasFilters.slice();
            },
            set: function (value) {
                this._canvasFilters = value && value.slice();
                this._updateFilterHooks();
            }
        }
    });

    PIXI.Container.prototype._updateFilterHooks = function () {
        if (this._alphaMask || (this._canvasFilters && this._canvasFilters.length > 0)) {
            if (this._CF_originalCalculateBounds == null) {
                this._CF_originalRenderCanvas = this.renderCanvas;
                this._CF_originalCalculateBounds = this.calculateBounds;
                this.renderCanvas = this._renderFilterCanvas;
                this.calculateBounds = this._calculateFilterBounds;
            }
        }
        else if (this._CF_originalCalculateBounds != null) {
            this.renderCanvas = this._CF_originalRenderCanvas;
            this.calculateBounds = this._CF_originalCalculateBounds;
            this._CF_originalCalculateBounds = null;
        }
    }

    PIXI.Filter.prototype.expandCanvasBounds = function (bounds) {
        // nop
    }

    PIXI.Filter.prototype.drawToCanvas = function (input_tex, aux_tex, out_ctx, x, y) {
        return input_tex;
    }


    PIXI.filters.DropShadowFilter.prototype.expandCanvasBounds = function (bounds) {
        var dist = this.distance;
        var angle = this.angle;
        var radius = this.blur / 3;

        var dx = Math.sin(angle) * dist;
        var dy = Math.cos(angle) * dist;

        bounds.minX += Math.min(dx, 0) - radius;
        bounds.minY += Math.min(dy, 0) - radius;
        bounds.maxX += Math.max(dx, 0) + radius;
        bounds.maxY += Math.max(dy, 0) + radius;
    }

    function create_canvas_render_target(texture) {
        var renderTexture = texture.baseTexture;
        renderTexture._canvasRenderTarget = new PIXI.CanvasRenderTarget(renderTexture.width, renderTexture.height, renderTexture.resolution);
        renderTexture.source = renderTexture._canvasRenderTarget.canvas;
        renderTexture.valid = true;
    }

    PIXI.filters.DropShadowFilter.prototype.drawToCanvas = function (input_tex, aux_tex, out_ctx, x, y) {
        var outtex = null;

        if (out_ctx == null) {
            outtex = aux_tex;
            if (!aux_tex.baseTexture._canvasRenderTarget) {
                create_canvas_render_target(aux_tex);
            }

            out_ctx = aux_tex.baseTexture._canvasRenderTarget.context;
            x = y = 0;

            outtex.baseTexture._canvasRenderTarget.clear();
        }

        var dist = this.distance;
        var angle = this.angle;
        var color = PIXI.utils.hex2rgb(this.color);
        var res = input_tex.baseTexture.resolution;

        out_ctx.save();
        out_ctx.shadowColor = "rgba(" + color[0] * 255 + "," + color[1] * 255 + "," + color[2] * 255 + "," + this.alpha + ")";
        out_ctx.shadowBlur = this.blur / 3 * res;
        out_ctx.shadowOffsetX = Math.sin(angle) * dist * res;
        out_ctx.shadowOffsetY = Math.cos(angle) * dist * res;

        out_ctx.setTransform(1, 0, 0, 1, 0, 0);
        out_ctx.drawImage(input_tex.baseTexture._canvasRenderTarget.canvas, x * res, y * res);
        out_ctx.restore();

        return outtex;
    }

    PIXI.filters.BlurFilter.prototype.expandCanvasBounds = function (bounds) {
        var radius = this.blur / 3;

        bounds.minX -= radius;
        bounds.minY -= radius;
        bounds.maxX += radius;
        bounds.maxY += radius;
    }

    PIXI.filters.BlurFilter.prototype.drawToCanvas = function (input_tex, aux_tex, out_ctx, x, y) {
        var radius = this.blur / 3;
        var res = input_tex.baseTexture.resolution;

        StackBlur.canvasRGBA(
            input_tex.baseTexture._canvasRenderTarget.canvas,
            0, 0, input_tex.width * res, input_tex.height * res,
            radius * res
        );

        return input_tex;
    }

    PIXI.Container.prototype._calculateFilterBounds = function () {
        this._CF_originalCalculateBounds();

        var bounds = this._bounds;
        var filters = this._canvasFilters;

        if (filters != null) {
            for (var i = 0; i < filters.length; i++) {
                filters[i].expandCanvasBounds(bounds);
            }
        }
    }

    PIXI.Container.prototype._renderFilterCanvas = function (renderer) {
        if (!this.visible || this.alpha <= 0 || !this.renderable) {
            return;
        }

        var filters = this._canvasFilters;

        if ((filters == null || filters.length == 0) && this._alphaMask == null) {
            return this._CF_originalRenderCanvas(renderer);
        }

        var bounds = this.getBounds(true);
        var wt = this.worldTransform;

        var x = Math.floor(bounds.x);
        var y = Math.floor(bounds.y);
        var w = Math.ceil(bounds.width + bounds.x - x);
        var h = Math.ceil(bounds.height + bounds.y - y);

        // Expand area to increments of 32 to minimize reallocations
        w = (w + 31) & ~31;
        h = (h + 31) & ~31;

        if (w < 1 || h < 1)
            return;

        var cachedRenderTarget = renderer.context;

        var m = this._filterMatrix;
        if (m == null)
            m = this._filterMatrix = wt.clone();

        this._filterTexMain = allocate_render_texture(this._filterTexMain, renderer, w, h);
        this._filterTexAux = allocate_render_texture(this._filterTexAux, renderer, w, h);

        // render
        var originalRenderCanvas = this.renderCanvas;
        this.renderCanvas = this._CF_originalRenderCanvas;

        this.localTransform.copy(m).invert().prepend(wt).translate(-x, -y);

        if (!this._filterTexMain.baseTexture._canvasRenderTarget) {
            create_canvas_render_target(this._filterTexMain);
        }
        this._filterTexMain.baseTexture._canvasRenderTarget.clear();

        renderer.render(this, this._filterTexMain, true, m, false);

        if (this._alphaMask != null) {
            this._alphaMask.renderable = true;
            //this._alphaMask.worldTransform.copy(m).translate(-x, -y);
            renderer.render(this._alphaMask, this._filterTexAux, true, m, false);
            this._alphaMask.renderable = false;
        }

        this.renderCanvas = originalRenderCanvas;

        // mask
        if (this._alphaMask != null) {
            var main_ctx = this._filterTexMain.baseTexture._canvasRenderTarget.context;

            if (!this._filterTexAux.baseTexture._canvasRenderTarget) {
                create_canvas_render_target(this._filterTexAux);
            }

            var mask_ctx = this._filterTexAux.baseTexture._canvasRenderTarget.context;

            if (AlphaMask_use_getImageData) {
                apply_alpha_mask(main_ctx, mask_ctx, w, h, renderer.resolution);
            }
            else {
                main_ctx.globalCompositeOperation = 'destination-in';
                main_ctx.setTransform(1, 0, 0, 1, 0, 0);
                main_ctx.drawImage(this._filterTexAux.baseTexture._canvasRenderTarget.canvas, 0, 0);
                main_ctx.globalCompositeOperation = 'source-over';
            }
        }

        // restore context
        renderer.context = cachedRenderTarget;

        // evaluate filters
        var ctx = renderer.context;

        ctx.globalAlpha = this.worldAlpha;

        var curtex = this._filterTexMain;
        var auxtex = this._filterTexAux;
        var rvlast = curtex;

        if (filters != null && filters.length > 0) {
            for (var i = 0; i < filters.length - 1; i++) {
                var rv = filters[i].drawToCanvas(curtex, auxtex, null, 0, 0);

                if (rv == auxtex) {
                    var tmp = auxtex;
                    auxtex = curtex;
                    curtex = tmp;
                }
            }

            // evaluate last filter and render
            rvlast = filters[filters.length - 1].drawToCanvas(curtex, auxtex, ctx, x, y);
        }

        if (rvlast != null) {
            var res = renderer.resolution;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.drawImage(rvlast.baseTexture._canvasRenderTarget.canvas, x * res, y * res);
        }

        this.updateTransform();
    }
}

