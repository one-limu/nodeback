

const randomS = (num,opsi='') => {
	var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	if(opsi == 'uppercase'){
		str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	}
	if(opsi == 'lowercase'){
		str = 'abcdefghijklmnopqrstuvwxyz'
	}
	if(opsi == 'number'){
		str = '0123456789'
	}
	
	var text = "";
	for (var i = 0; i < num; i++)
		text += str.charAt(Math.floor(Math.random() * str.length));
	return text;
}


module.exports = {
	rand : randomS
}