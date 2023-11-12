module.exports = function(RED) {
    function CaptureNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            const cv = require('opencv4nodejs');
            const cameraId = 2; // Adjust this based on your camera
            const width = cameraId === 2 ? 1920 : 1280;
            const height = cameraId === 2 ? 1080 : 720;
            
            const cap = new cv.VideoCapture(cameraId);
            cap.set(cv.CAP_PROP_FRAME_WIDTH, width);
            cap.set(cv.CAP_PROP_FRAME_HEIGHT, height);

            const frame = cap.read();
            cap.release();

            if (frame.empty) {
                msg.payload = null;
            } else {
                const jpgAsBase64 = cv.imencode('.jpg', frame).toString('base64');
                msg.payload = jpgAsBase64;
            }

            node.send(msg);
        });
    }
    RED.nodes.registerType("capture", CaptureNode);
}
