# 🌈 彩虹屁老婆

官网：https://rfw.jnsii.com

Languages: 简体中文 | [English](https://github.com/ezshine/vscode-rainbow-fart-waifu/blob/master/README.md)

此插件的创意来自 [@SaekiRaku](https://github.com/SaekiRaku/vscode-rainbow-fart) ，兼容原版的语音包。并在功能上做了一些改进

## 支持的编辑器和平台
仅支持MacOS和Windows10

## 鸣谢

1.插件包中包含了 [@justkowalski](https://github.com/JustKowalski)，[@PGG: 糖糖](https://github.com/heixiaobai/rainbow-fart-voice-pack) 两款语音包。
2.插件中包含了cmdmp3win.exe，来自作者 [@James K. Lawless](http://jiml.us)
3.插件中默认的老婆模型来自插画师 [@二夏](https://erxia207.lofter.com)，如果你想原创自己的老婆，可以找她约稿哦。

## 特性

1.无须打开网页即可播放彩虹屁语音。
2.可与彩虹屁老婆容器互动，在你的桌面上放置一个虚拟老婆陪你写代码。

## 语音包使用注意事项

1.使用contributes.json而不是manifest.json。
2.在contributes.json中加入texts来标记语音对应的文字内容
~~~~javascript
"contributes": [
    {
        "keywords": ["function", "=>", "func ", "def "],
        "voices":[
            "function_01.mp3",
            "function_02.mp3",
            "function_03.mp3"
        ],
        "texts":[
            "哇哦，你的回调函数写的好棒棒呀！",
            "这个函数的命名用我的名字怎么样呀？",
            "再厉害的函数，也执行不出我对你的喜欢！"
        ]
    }
]
~~~~


**Enjoy!**
