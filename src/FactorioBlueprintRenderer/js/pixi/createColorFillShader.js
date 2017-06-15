const PIXI = require("pixi.js");

createColorFillShader = function() {
    var DefaultVert = (function() {
        var str = "";

        str += "attribute vec2 aVertexPosition;";
        str += "attribute vec2 aTextureCoord;";

        str += "uniform mat3 projectionMatrix;";

        str += "varying vec2 vTextureCoord;";

        str += "void main(void)";
        str += "{";
        str += "gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);";
        str += "vTextureCoord = aTextureCoord;";
        str += "}";

        return str;
    })();

    var ColorFill = function(hexVal) {
        var str = "";

        str += "precision mediump float;";

        str += "varying vec2 vTextureCoord;";
        str += "uniform sampler2D uSampler;";
        str += "uniform vec3 rgbColor;";


        str += "void main(void) {";

        str += "gl_FragColor = texture2D(uSampler, vTextureCoord);";
        str += "gl_FragColor.r = rgbColor.r * gl_FragColor.a;";
        str += "gl_FragColor.g = rgbColor.g * gl_FragColor.a;";
        str += "gl_FragColor.b = rgbColor.b * gl_FragColor.a;";
        str += "}";

        PIXI.Filter.call(this, DefaultVert, str);

        if (hexVal !== undefined) {
            this.hexColor = hexVal;
        }
    };

    ColorFill.prototype = Object.create(PIXI.Filter.prototype);
    ColorFill.prototype.constructor = ColorFill;
    Object.defineProperties(ColorFill.prototype, {
        rgbColor: {
            get: function() {
                return this.uniforms.rgbColor;
            },
            set: function(value) {
                this.uniforms.rgbColor = value;
            }
        },

        hexColor: {
            get: function() {
                return PIXI.utils.rgb2hex(this.uniforms.rgbColor);
            },
            set: function(value) {
                this.uniforms.rgbColor = PIXI.utils.hex2rgb(value);
            }
        }
    });

    return ColorFill;
};

module.exports = createColorFillShader;