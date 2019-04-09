import Promise from "../utils/es6-promise";
const wxGetImageInfo = url => {
    return new Promise((resolve, reject) => {
        wx.getImageInfo({
            src: url,
            success: resolve,
            fail: reject
        });
    });
};
const wxPreviewImage = (urls = [], current) => {
    return new Promise((resolve, reject) => {
        wx.previewImage({
            current: current,
            urls: urls,
            success: resolve,
            fail: reject
        });
    });
};

const wxCanvasToTempFilePath = ({}) => {
    return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath({
            src: url,
            success: resolve,
            fail: reject
        });
    });
};

const wxGetSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: resolve,
            fail: reject
        });
    });
};

const wxAuthorize = scope => {
    return new Promise((resolve, reject) => {
        wx.authorize({
            scope: scope,
            success: resolve,
            fail: reject
        });
    });
};

module.exports = {
    wxGetImageInfo: wxGetImageInfo,
    wxPreviewImage: wxPreviewImage,
    wxCanvasToTempFilePath: wxCanvasToTempFilePath,
    wxGetSetting: wxGetSetting,
    wxAuthorize: wxAuthorize
};
