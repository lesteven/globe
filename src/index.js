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
	//console.log(data)
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

	const map= 'https://enjalot.github.io/wwsd/data/world/world-110m.geojson'
	
	//insert map
	
	getData(map,function(mapData){
		//console.log(mapData)
		svg.append('path')
			.attr('d',path(mapData))
			//shows data on mousehover
		let div = select('body')
			.append('div')
			.attr('class','tooltip')
			.style('opacity',0);

		//console.log(data.features)
		svg.selectAll('circle')
			.data(data.features)
			.enter().append('circle')
				.attr('cx',function(d){if(d.geometry)	return projection(d.geometry.coordinates)[0]})
				.attr('cy',function(d){if(d.geometry)return projection(d.geometry.coordinates)[1]})
				.attr('r', function(d){return Math.cbrt(d.properties.mass)/12})
				.style('fill','orange')
				.on('mouseover',function(d){
					div.transition()
						.duration(200)
						.style('opacity',.9)
					div.html(
						'Fall: ' + d.properties.fall + '</br>' +
						'Mass: ' + d.properties.mass + '</br>' +
						'Name: ' + d.properties.name + '</br>' +
						'Nametype: ' + d.properties.nametype + '</br>' +
						'Recclass: ' + d.properties.recclass + '</br>' +
						'Reclat: ' + d.properties.reclat + '</br>' +
						'year: ' + d.properties.year + '</br>' 
						)
						.style('left',(event.pageX +40)+'px')
						.style('top',(event.pageY-100)+'px')
					
				})
				.on('mouseout',function(d){
					div.transition()
						.duration(500)
						.style('opacity',0)
				})
		})
}