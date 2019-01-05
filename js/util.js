var utils = {
	contractAddress: "TGWMgqECa5zXjXpCGFDFmNLJfxxfKbpbc1",
	base_url: "http://troth.nasparty.online/",
	
	init: function(){
		var that = this;
		setTimeout(function(){that.intervalId = setInterval(that.checkTronLink, 1000)}, 1000);
	},
	
	checkTronLink: function(){
		if(window.tronWeb !== undefined && window.tronWeb.ready == true){
			clearInterval(utils.intervalId);
			utils.initContract();
		}
		else{
			$("#mainModal .modal-body").text("Please install tronlink browser extension and log in.");
			$("#mainModal").modal("show");	
		}
	},
	
	initContract: function(){
		var that = this;
	
		tronWeb.trx.getContract(this.contractAddress).then(function(value){
			that.contract = tronWeb.contract(value.abi.entrys, value.contract_address);
		});
	},
	
	getContract: function(){
		var that = this;
		var promise = new Promise(function(resolve, reject){
			if(that.contract !== undefined){
				resolve(that.contract);
			}
			else{
				var intId = setInterval(function(){
					console.log("waiting for initialization...");
					if(that.contract !== undefined){
						clearInterval(intId);
						resolve(that.contract);
					}
				}, 300);
			}
		});
		return promise;
	}
};


utils.init();
