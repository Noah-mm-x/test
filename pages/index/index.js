//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        name: "哈哈",
        num: '3',
        saving: false,
    },
    //事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        console.log('name：', app.globalData.name);
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.handleDrawWxShareImg();
    },
    getUserInfo(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    handleDrawWxShareImg(){
        const ctx = wx.createCanvasContext("shareCanvas");
        ctx.setFillStyle('red')
        ctx.fillRect(0,0,50,50);
        ctx.draw()
    },
    handleSave() {
        const self = this;
        this.handleDrawWxShareImg();
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: "shareCanvas",
                success(res) {
                    const tempFilePath = res.tempFilePath;
                    self.saveImg(tempFilePath);
                },
                fail(err) {
                    console.log(err);
                }
            });
        }, 300);
    },
    saveImg(path) {
        let self = this;
        if (self.data.saving) return false;
        self.setData({
            saving: true
        });
        wx.showLoading({
            title: '保存中',
        })
        wx.getSetting({
            success(res) {
                if (!res.authSetting["scope.writePhotosAlbum"]) {
                    wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success() {
                            wx.saveImageToPhotosAlbum({
                                filePath: path,
                                success(res) {
                                    wx.hideLoading()
                                    self.setData({
                                        saving: false,
                                        sharePopupIsShow: false
                                    });
                                    wx.showToast({
                                        title: "保存成功",
                                        icon: "success",
                                        duration: 2000
                                    });
                                }
                            });
                        }
                    });
                } else {
                    wx.saveImageToPhotosAlbum({
                        filePath: path,
                        success(res) {
                            wx.hideLoading()
                            self.setData({
                                saving: false,
                                sharePopupIsShow: false
                            });
                            wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2000
                            });
                        },
                        fail(err) {}
                    });
                }
            },
            fail(err) {
                wx.hideLoading()
            }
        });
    },
})
