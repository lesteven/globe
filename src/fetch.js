function getData(url,cb){
	fetch(url)
	.then(response=>response.json())
	.then(data=>{
		cb(data)
	})
}
export default getData;