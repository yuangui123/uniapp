export class FileUtil {
	
	public static  dataURLtoFile(dataurl, filename) {//将base64转换为文件
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
	}
	
	public static base64String2Blob(dataurl: string):Blob {
		let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	} 
	
	public static blobString2Base64(blobUrl: string, callback): void {
		let xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		xhr.onload = () => {
			let recoveredBlob = xhr.response;
			let reader = new FileReader();
			reader.onload = () => {
				let blobAsDataUrl = reader.result;
				
				callback(blobAsDataUrl)
			};
			reader.readAsDataURL(recoveredBlob);
		};
		xhr.open('GET', blobUrl);
		xhr.send();
	}
	
}