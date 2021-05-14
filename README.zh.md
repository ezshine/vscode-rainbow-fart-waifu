# 🌈 彩虹屁老婆
![](https://s1.ax1x.com/2020/08/21/dNvHfS.gif)

官网：[https://rfw.jnsii.com](https://rfw.jnsii.com)

Languages: 简体中文 | [English](./README.md)

## 概述

---

此插件的创意来自 [@SaekiRaku](https://github.com/SaekiRaku/vscode-rainbow-fart) ，兼容原版的语音包。并在功能上做了一些改进

## 鸣谢

---

1. 插件包中包含了 [@justkowalski](https://github.com/JustKowalski) 中文语音包。你可以从github上[获取更多彩虹屁语音包](https://github.com/topics/rainbow-fart)。 
2. 插件中包含了cmdmp3win.exe，来自作者 [@James K. Lawless](http://jiml.us)
3. 插件中默认的老婆模型来自插画师 [@二夏](https://erxia207.lofter.com)，如果你想原创自己的老婆，可以找她约稿哦。
4. 插件中还包含了一款开源的血小板模型，由来自 [@DenchiSoft](https://twitter.com/DenchiSoft/status/1036017773011525632) 提供。

[更多彩虹屁老婆模型](https://github.com/ezshine/live2d-model-collections)

## 支持的平台

---

~~~~
仅支持MacOS和Windows10
~~~~

## 使用答疑

---

#### _为什么开启后没有虚拟老婆出现？_
> 答：因为要先[下载彩虹屁老婆容器](https://github.com/ezshine/live2d-model-collections)。下载后，双击运行liv2dplayer.exe，在vscode中呼出命令列表，使用Switch Waifu Model来加载模型。

## 使用方法，命令列表

---

🌈 Show Rainbow Fart Waifu Commands

- "Switch Voice Packages"

> 切换语音包

- "Switch Waifu Models"

> 切换老婆模型

- "Open Resource Directory"

> 如果你从互联网下载了彩虹屁语音包或者老婆模型包，你需要使用这条命令来打开资源目录，将下载后的文件移动到此目录下

- "Download Waifu Container and More Resources"

> 下载老婆容器以及更多语音包模型包

## 特性

---

1. 无须打开网页即可播放彩虹屁语音。
2. 可与彩虹屁老婆容器互动，在你的桌面上放置一个虚拟老婆陪你写代码。

## 语音包使用注意事项

---

~~~~
当你自定义语音包或从互联网上下载语音包需要注意的事项
~~~~

1. 使用contributes.json而不是manifest.json。
2. 在contributes.json中加入texts来标记语音对应的文字内容

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

## 支持作者

---

如果你觉得这个软件给你的编程生活带来了一点乐子，请我喝一杯冰阔落可以吗？

![](./resources/donate.jpg)







**Enjoy!**