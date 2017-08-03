import {
	selectAll,
	select,
	selection,
	html,
	event} from 'd3-selection';
import {transition} from 'd3-transition';
import {geoMercator,geoPath,projection} from 'd3-geo';
require('./index.css');

const url= 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json'

getData(url)

function getData(url){
	fetch(url)
	.then(response=>response.json())
	.then(data=>{
		drawGraph(data)
	})
}
function drawGraph(data){
	console.log(data)
	//variable holding svg attributes
	const width = 950;
	const height = 550;

	//creates svg
	let svg = select('body')
		.append('svg')
		.attr('width',width)
		.attr('height',height)
		.attr('class','graph');

	let projection = geoMercator()
		.scale(width/2 /Math.PI)
		.translate([width/2,height/2])
	let path = geoPath().projection(projection)
	
}