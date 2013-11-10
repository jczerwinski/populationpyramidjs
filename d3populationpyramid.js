function PeoplePyramid (data, elementID) {
	this.data = data;
	this.data.by = crossFilter(this.data);
	this.data.by.year = this.data.by.dimension(function (d) {
		return d.year;
	});
	this.data.by.age = this.data.by.dimension(function (d) {
		return d.age;
	});
	this.data.by.sex = this.data.by.dimension(function (d) {
		return d.sex;
	});
	this.data.by.people = this.data.by.dimension(function (d) {
		return d.people;
	});

	this.data.by.age.max = this.data.by.age.top(1);
	this.data.by.people.max = this.data.by.people.top(1);
	this.data.by.age.groups = this.data.by.age.group();
	
	this.width = 600;
	this.height = 800;
	this.center = this.width/2;

	this.age = d3.scale.ordinal()
		.domain(this.data.by.age.groups.size())
		.rangeRoundBands([0, height]);

	this.people = {};
	this.people.men = d3.scale.linear()
		.domain([0, this.data.by.people.max])
		.rangeRound([this.center, width])
		.nice(5);

	this.people.women = this.people.men.copy()
		.rangeRound([this.center, 0]);

	this.chart = d3.select('#' + elementID)
		.attr('width', width)
		.attr('height', height);

	// If this year is in the data, start with it. Otherwise, go back to the beginning of time.
	this.year = this.data.by.year.filter(new Date().getFullYear()).top(1)[0] || this.data.by.year.filter(null).bottom(1)[0];

	this.bars = d3.selectAll('g')
		.data(data)
		.enter().append('g')
		.attr('x', this.center)
		.attr('y', function (d) {
			return age(d.age);
		});

	this.bars.append('rect')
		.attr('')
};