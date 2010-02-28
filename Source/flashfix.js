var FlashFixClass = new Class({
	initialize: function(updatePositions){
		if(Browser.Engine.trident)
		{
			this.hide = this.show = $lambda();
			this.insert = this.ieinsert;
		}
		else
		{
			this.updatePositions = !!updatePositions;
			this.container = new Element('div').inject(document.body); // document.body
		}
	},
	ieinsert: function(flash, el){
		document.id(el).grab(flash);
	},
	insert: function(flash, el, hidden){
		el = document.id(el);
		var position = el
			.setStyles({width:flash.width.toInt(), height:flash.height.toInt()})
			.getPosition();
		flash
			.store('FlashFix:el', el)
			.store('FlashFix:hide', !!hidden)
			.setStyles({
				position: 'absolute',
				top: position.y,
				left: hidden?-2000:position.x
			})
			.inject(this.container);
	},
	show: function(flash){
		if(flash.retrieve('FlashFix:hide')){ // show, only if hidden
			flash.store('FlashFix:hide', false);
			var position = flash.retrieve('FlashFix:el').getPosition();
			flash.setStyles({ // I know about setPosition, but this is better
				top: position.y,
				left: position.x
			});
		}
		if(this.updatePositions)
			this.update();
	},
	hide: function(flash){
		if(!flash.retrieve('FlashFix:hide')){ // hide, only if shown
			flash
				.store('FlashFix:hide', true)
				.setStyle('left',-2000);
		}
		if(this.updatePositions)
			this.update();
	},
	dispose: function(flash){
		flash.dispose();
	},
	update: function(){
		this.container.getChildren().each(function(flash){
			if(!flash.retrieve('FlashFix:hide')){ // if flash is shown
				var el_position = flash.retrieve('FlashFix:el').getPosition();
				if(el_position.x != flash.getStyle('left').toInt())
					flash.setStyle('left', el_position.x);
				if(el_position.y != flash.getStyle('top').toInt())
					flash.setStyle('top', el_position.y);
			}
		});
	}
}); 