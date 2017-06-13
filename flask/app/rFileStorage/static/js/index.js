var main = new Vue({
	el: '#app',
	mounted: function()
	{
		this.getFilelist();
		setInterval(function(){main.getFilelist()}, 30000);
	},
	methods:
	{
		getFilelist: function()
		{
			var resource = this.$resource(this.apiUrl)
			resource.get().then(
				(response) => 
				{
					this.filelist = response.data
				})
		},
		downloadFile: function(n, t)
		{
			var resource = this.$resource(this.apiUrl)
			resource.get({fname: n, token: t}).then(
				(response) =>
				{
					if(response.data['code'] == 1)
					{
						location.href = response.url
					}
					else
					{
						this.getFilelist()
						alert(response.data['msg'])
					}
				})
		},
		readableSize: function(bytes) {
			if(bytes < 1024) return bytes + " B";
			else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KB";
			else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MB";
			else return(bytes / 1073741824).toFixed(3) + " GB";
		},
		readableTimeago: function(mtime) {
			var sec = Math.floor((Math.round(new Date().getTime()/1000) - mtime));
			let T = {minute: 60};
			T.hour = T.minute*60;
			T.day = T.hour*24;
			T.week = T.day*7;
			T.month = T.day*30;
			T.year = T.month*12;
			let pre = '';
			for (let i in T){
				if(sec < T[i]){
					calculated = Math.round(sec/T[pre]);
					if(calculated >= 1){
						return `${calculated} ${pre}${calculated==1?'':'s'} ago`;
						break;
					}
				}
			pre = i;
			}
			return 'just now';
		},
	},
	data:
	{
		apiUrl: '/api/download{/token}{/fname}',
		filelist: [],
	},
})
