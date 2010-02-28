import flash.text.TextField;
import flash.text.TextFieldType;
import flash.display.Sprite;
import flash.events.Event;
import flash.external.ExternalInterface;

class Flashpad extends Sprite
{
    var tf:TextField;
    var samples:Array<String>;
    static function main()
    {
        var fp:Flashpad = new Flashpad();
        flash.Lib.current.addChild(fp);
        fp.init();
    }
    private function init()
    {
        samples = ["MooTools ftw!","I love MooTools!","Moooo!","Mootools - My Object Oriented (JavaScript) Tools"];
        tf = new TextField();
        tf.width = stage.stageWidth - 1;
        tf.height = stage.stageHeight - 1;
        tf.multiline = true;
        tf.border = true;
        tf.text = samples[Std.random(samples.length)];
        tf.type = TextFieldType.INPUT;
        addChild(tf);
        if(ExternalInterface.available)
        {
            ExternalInterface.addCallback("GetText", GetText);
            ExternalInterface.addCallback("SetText", SetText);
        }
        else
        {
        	tf.text = "ERROR! ExternalInterface is not avaliable!";
        }
    }
    private function GetText():String
    {
        return tf.text;
    }
    private function SetText(text:String)
    {
        tf.text = text;
    }
}