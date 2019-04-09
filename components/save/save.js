import { wxGetSetting, wxAuthorize } from "../../utils/wxApi";
import regeneratorRuntime from "../../utils/runtime";

Component({
    externalClasses: ["self-class"],
    lifetimes: {
        // 在组件实例进入页面节点树时执行
        attached() {
            this.getAuthInfo();
        },
        // 在组件实例被从页面节点树移除时执行
        detached() {

        }
    },
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        /*
         *  notAuth 没授权过
         *  authAndAccept  授权过且接受了
         *  authButReject  授权过但是拒绝了
         */
        authInfo: "notAtuh"
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async getAuthInfo() {
            const scope = "scope.writePhotosAlbum";
            const authResult = await wxGetSetting();
            let authInfo;
            console.log("authSetting[scope]", authResult.authSetting, authResult.authSetting[scope]);
            switch (authResult.authSetting[scope]) {
                case undefined:
                    authInfo = "notAtuh";
                    break;
                case false:
                    authInfo = "authButReject";
                    break;
                case true:
                    authInfo = "authAndAccept";
                    break;
                default:
                    console.log("未知错误");
                    break;
            }

            this.setData({
                authInfo: authInfo
            });
            console.log("authInfo", authInfo);
        },
        _handleAuth() {
            const self = this;
            const scope = "scope.writePhotosAlbum";
            wxAuthorize(scope)
                .then(res => {
                    console.log("res", res);
                    self.setData({
                        authInfo: 'authAndAccept'
                    })
                })
                .catch(err => {
                    self.setData({
                        authInfo: 'authButReject'
                    })
                    console.log("err", err);
                });
        },
        handleDeal() {
            this.triggerEvent('handleDeal')
        },
        openSettingCallback() {
            // this.triggerEvent('openSettingCallback')
            const self = this;
            const scope = "scope.writePhotosAlbum";
            wxAuthorize(scope)
                .then(res => {
                    console.log("res", res);
                    self.setData({
                        authInfo: 'authAndAccept'
                    })
                })
                .catch(err => {
                    self.setData({
                        authInfo: 'authButReject'
                    })
                    console.log("err", err);
                });
        }
    }
});
