// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const {
	exec
} = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const messenger = require('messenger');
const client = messenger.createSpeaker(32718);

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let ostype;
let resources_dir;
//彩虹屁相关配参
let enabledRainbowFart = true;
let enabledInteractWithWaifu = true;
let inputDetectInterval = 1500;
let voicePackageName = "sharonring";
let vpPath;
let vpContributes;

async function enabledRainbowFartWaifu(){
	debugLog("好戏开始了");
	debugLog("当前时间：" + Date.now());
	ostype = os.type;
	debugLog("当前系统：" + ostype);
	
	const mp3Player = (ostype == "Darwin" ? "afplay" : path.posix.join(resources_dir, "players", "mp3player.exe"));

	setupVoicePackage();

	//时间标记名称，用于计算每一个时间标记提醒仅提醒一次
	let voice_mark = "";
	let last_voice_mark = "";
	//上次时间提醒，每隔半小时检查一次时间提醒
	let time_alarm = 0;
	//上次查询的时间戳，用户计算间隔
	let pre = 0;
	//当编辑器中正在输入的时候
	vscode.workspace.onDidChangeTextDocument(evt => {
		var activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			return;
		}
		const {text} = activeEditor.document.lineAt(activeEditor.selection.active.line);

		if (text.length > 50) return;
		parseLine(text);
	})
	
	//重头戏在这里，解析当前行内容并作出相应的反应
	//todo 优化查询性能
	function parseLine(str) {
		
		const now = new Date();
		if (now - pre < inputDetectInterval) {
			//当两次解析间隔小于输入监测间隔时取消本次处理
			return;
		}
		//重设时间间隔起点
		pre = now;

		//优先时间提醒
		//当上一次的提示不是时间提醒，并且距离上次提醒超过30分钟时才执行时间判断
		if (voice_mark.indexOf("$") < 0 && now - time_alarm > 1800000) {
			time_alarm = now.getTime();
			const hour = now.getHours();
			const minute = now.getMinutes();
			if (minute == 0 && voice_mark != "$time_each_hour") {
				voice_mark = str = "$time_each_hour";
			} else if (hour > 6 && hour <= 9 && voice_mark != "$time_morning") {
				voice_mark = str = "$time_morning";
			} else if (hour >= 11 && hour <= 12 && minute > 30 && voice_mark != "$time_before_noon") {
				voice_mark = str = "$time_before_noon";
			} else if (hour >= 13 && hour <= 15 && voice_mark != "$time_noon") {
				voice_mark = str = "$time_noon";
			} else if (hour >= 20 && hour <= 21 && voice_mark != "$time_evening") {
				voice_mark = str = "$time_evening";
			} else if (hour >= 23 || hour <= 4) {
				voice_mark = str = "$time_midnight";
			}
		}

		let voices = [];
		let hited_item;
		hitkeyword: for (let i = vpContributes.length - 1; i >= 0; i--) {
			const item = vpContributes[i];
			const keywords = item.keywords;
			for (let j = keywords.length - 1; j >= 0; j--) {
				if (str.indexOf(keywords[j]) >= 0) {
					hited_item = item;
					const keyword = keywords[j];
					voice_mark = keyword;
					voices = item.voices;
					break hitkeyword;
				}
			}
		}

		// let motions;
		// if (enabledInteractWithWaifu && lpModelData.contributes) {
		// 	hitkeyword: for (let i = lpModelData.contributes.length - 1; i >= 0; i--) {
		// 		const item = lpModelData.contributes[i];
		// 		const keywords = item.keywords;
		// 		for (let j = keywords.length - 1; j >= 0; j--) {
		// 			if (voice_mark == keywords[j]) {
		// 				motions = item.motions;
		// 				break hitkeyword;
		// 			}
		// 		}
		// 	}
		// }

		//命中以及和上次命中结果不一样时才播放，加入彩虹屁开关
		if (voices.length != 0 && last_voice_mark != voice_mark) {
			debugLog("命中关键词：" + voice_mark);

			let voice_index = Math.floor(Math.random() * voices.length);
			if (enabledRainbowFart) {
				debugLog("即将播放音频：");
				last_voice_mark = voice_mark;

				//音频播放器命令路径，将空格转义
				let playerpath = mp3Player;
				let audiopath = path.posix.join(vpPath, voices[voice_index]);

				const cmd = '"' + playerpath + '" "' + audiopath + '"';
				debugLog(cmd);
				exec(cmd);
			} else {
				debugLog("彩虹屁语音未启用");
			}

			//和老婆进行互动
			if(enabledInteractWithWaifu){
				// let motionfile;
				// if (motions) {
				// 	motionfile = motions[Math.floor(Math.random() * motions.length)];
				// }
				showWifeMotion();

				//检查彩虹屁是否有台词文本，如果有则显示
				if (hited_item.texts) {
					let text = hited_item.texts[voice_index];
					showWifeTextBubble(text);
				}
			}
		}
	}
}

function debugLog(str){
	console.log(str);
}

function changeWifeModel(){
	client.shout("changeModel", {
		model: path.posix.join(lpPath, "model.json")
	});
}

function showWifeMotion(motionfile) {
	debugLog("切换老婆的动作：" + (motionfile ? motionfile : "随机"));
	client.shout('changeMotion', {
		motionfile: motionfile
	}); //motionfile
}

function showWifeTextBubble(str) {
	debugLog("让老婆显示文字：" + str);
	client.shout("say", {
		text: str
	});
}

function showInformation(msg){
	vscode.window.showInformationMessage(msg);
}

//配置语音包
function setupVoicePackage() {
	//语音包路径
	vpPath = path.posix.join(resources_dir, "voicepackages", voicePackageName);
	//校验语音包
	if (!fs.existsSync(vpPath)) {
		showInformation('没有找到语音包：' + voicePackageName);
	} else if (!fs.existsSync(path.posix.join(vpPath, "contributes.json"))) {
		showInformation('没有找到语音包配置文件(contributes.json)');
	} else {
		debugLog('已启用语音包' + voicePackageName);
	}

	//语音包配置表
	vpContributes = JSON.parse(fs.readFileSync(path.posix.join(vpPath, "contributes.json"))).contributes;
	debugLog(vpContributes);
}


function showRFWCommands(){
	vscode.window.showQuickPick(
		[
			"Switch Voice Packages",
			"Switch Waifu Model",
			"Open Resource Directory",
			"Download More Waifu Model or Voice Packages"
		],
		{
			canPickMany:false,
			ignoreFocusOut:false,
			matchOnDescription:true,
			matchOnDetail:true,
			placeHolder:'🌈 Rainbow Fart Waifu Commands'
		})
	.then(function(msg){
		if(msg === "Switch Voice Packages"){
			quickPickVoicePackages();
		}else if(msg === "Switch Waifu Model"){
			quickPickWaifuModel();
		}else if(msg === "Open Resource Directory"){
			openResourceDir();
		}else if(msg === "Download More Waifu Model or Voice Packages"){
			openWebsite();
		}
	})
}

function quickPickVoicePackages(){
	var vpDir = path.posix.join(resources_dir, "voicepackages");
	var res = [],
		files = fs.readdirSync(vpDir);
	files.forEach(function(filename) {
		var filepath = path.posix.join(vpDir, filename),
			stat = fs.lstatSync(filepath);

		if (stat.isDirectory()) {
			res.push({
				label: filename,
				description: (filename == voicePackageName ? "使用中" : "")
			});
		}
	});

	const pickResult = vscode.window.showQuickPick(res, {
		placeHolder: 'Switch Voice Packages'
	});
	pickResult.then(function(result) {
		if (!result) {
			return;
		}
		if (result.description == "") {
			voicePackageName = result.label;
			setupVoicePackage();
		}
	});
}

function quickPickWaifuModel(){
	var vpDir = path.posix.join(resources_dir, "live2dpackages");
	var res = [],
		files = fs.readdirSync(vpDir);
	files.forEach(function(filename) {
		var filepath = path.posix.join(vpDir, filename),
			stat = fs.lstatSync(filepath);

		if (stat.isDirectory()) {
			res.push(filename);
		}
	});

	const pickResult = vscode.window.showQuickPick(res, {
		placeHolder: 'Switch Waifu Model'
	});
	pickResult.then(function(result) {
		if (!result) {
			return;
		}

		lpPath = path.posix.join(vpDir,result);
		changeWifeModel();
	});
}

function openResourceDir(){
	let openpath = path.posix.join("file:", resources_dir);
	vscode.env.openExternal(openpath);
}

function openWebsite(){
	vscode.env.openExternal("https://rfw.jnsii.com");
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	resources_dir = path.posix.join(__dirname, "resources");
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "rainbow-fart-waifu" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('rainbow-fart-waifu.enable', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from rainbow-fart-waifu!');
		enabledRainbowFartWaifu();
	});

	context.subscriptions.push(disposable);

	let disposable2 = vscode.commands.registerCommand('rainbow-fart-waifu.showcommands', function () {
		showRFWCommands();
	});

	context.subscriptions.push(disposable2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
