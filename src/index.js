import {
	selectAll,
	select,
	selection,
	html,
	event} from 'd3-selection';
import {transition} from 'd3-transition';
import {geoMercator,geoPath,projection} from 'd3-geo';
import getData from './fetch.js';
require('./index.css');

const url= 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json'
//const map = 'https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json'

getData(url,drawGraph);

function drawGraph(data){
	//variable holding svg attributes
	const width = 1200;
	const height = 600;

	//creates svg
	let svg = select('body')
		.append('svg')
		.attr('width',width)
		.attr('height',height)
		.attr('class','graph');

	let projection = geoMercator()
		.scale(width/7)
		.translate([width/2,height/2])
	let path = geoPath()
		.projection(projection)

	const map= 'http://enjalot.github.io/wwsd/data/world/world-110m.geojson'
	
	//inser map
	getData(map,function(mapData){
		console.log(mapData)
		svg.append('path')
			.attr('d',path(mapData))
	})

}