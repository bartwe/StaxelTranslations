const path = require('path');
const fs = require('fs');

const _address = `C:/Users/Administrator/Downloads/StaxelTranslations-master/ko-KR/`;
const _extension = `.lang`;
const _original_string = `en_GB`;
const _replace_string = `ko_KR`;
const _use_upper_char = true;

const __original_language_code = `en-GB`;
const __original_language = `English`;
const __language_code = `ko-KR`;
const __language = `한국어`;

var dir = fs.readdirSync(_address);
var dir_length = dir.length;
for(var i=0;i<dir_length;i++)
{
	console.log(`[INFO] FIle analyze - ${dir[i]}`);
	var stats;
	try
	{
		var finalpath = path.join(_address,  dir[i]);
		stats = fs.statSync(finalpath);
	}
	catch(err)
	{
		console.log(`[ERR] Error from load stats ${dir[i]}, continue... : ${err}`);
		continue;
	}
	if(stats.isFile())
	{
		var original_name = dir[i]
		if(path.extname(original_name) == _extension)
		{
			if(original_name.indexOf(_original_string) > -1)
			{
				var replace_name = original_name;
				replace_name = replace_name.replace(_original_string, _replace_string);
				var renamedAddress = path.join(_address, replace_name);
				try
				{
					fs.renameSync(path.join(_address, original_name), renamedAddress);
					console.log(`[ALERT] Renamed ${original_name} :  ${_original_string} to ${_replace_string}`);
				}
				catch(err)
				{
					console.log(`[ERR] Error from rename ${original_name}, continue... : ${err}`);
					continue;
				}
				var streamBuf = "";
				var file = "";
				try
				{
					file = fs.readFileSync(renamedAddress).toString();
					console.log(file);
				}
				catch(err)
				{
					console.log(`[ERR] Error from reading file for replace ${renamedAddress}, continue... : ${err}`);
					continue;
				}
				if(file.indexOf(__original_language_code) > -1)
				{
					file = file.replace(__original_language_code, __language_code);
					console.log(`[ALERT] Replaced ${__original_language_code} to ${__language_code}`);
				}
				else
				{
					console.log(`[WARN] language code was not replaced`)
				}
				if(file.indexOf(__original_language) > -1)
				{
					file = file.replace(__original_language, __language);
					console.log(`[ALERT] Replaced ${__original_language} to ${__language}`);
				}
				else
				{
					console.log(`[WARN] language was not replaced`)
				}
				try{
					fs.writeFileSync(renamedAddress, file);
				}
				catch(err){
					console.log(`[ERR] Error from writing file for replace ${renamedAddress}, continue... : ${err}`);
				}
			}
			else
			{
				console.log(`[INFO] Couldn't find "${_original_string}" in "${original_name}" file's name. continue... : `);
			}
		}
		else
		{
			console.log(`[INFO] "${original_name}" file extension was ${path.extname(original_name)}, it's not ${_extension}. got ${path.extname(original_name)}, continue... : `);
			continue;
		}
	}
	else 
	{
		console.log(`[ERR] ${original_name } was not file, continue...`);
		continue;
	}
}
console.log(`[ALERT] Finised!`);