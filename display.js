module.exports = function(RED) {
    function DisplayNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            const cv = require('opencv4nodejs');
            if (msg.payload === null) {
                const height = 1080;
                const width = 1920;
                const frame = new cv.Mat(height, width, cv.CV_8UC3, [0, 0, 0]);
                cv.imshow('Display', frame);
            } else {
                const imgBuffer = Buffer.from(msg.payload, 'base64');
                const frame = cv.imdecode(imgBuffer);
                cv.imshow('Display', frame);
            }

            cv.waitKey(1);
            node.send(msg);
        });
    }
    RED.nodes.registerType("display", DisplayNode);
}
