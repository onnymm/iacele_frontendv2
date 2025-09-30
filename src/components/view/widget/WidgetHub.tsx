import { CharWidget, CheckWidget, DatetimeWidget, DateWidget, DurationWidget, FloatWidget, IntegerWidget, Many2OneWidget, One2ManyTagsWidget, ProfilePicture, SelectionWidget, SwitchWidget, TextWidget, TimeWidget } from "./Widgets";

const WidgetHub = {
    'char': CharWidget,
    'integer': IntegerWidget,
    'float': FloatWidget,
    'boolean': CheckWidget,
    'text': TextWidget,
    'selection': SelectionWidget,
    'many2one': Many2OneWidget,
    'duration': DurationWidget,
    'datetime': DatetimeWidget,
    'date': DateWidget,
    'time': TimeWidget,
    'one2many': One2ManyTagsWidget,
    'many2many': One2ManyTagsWidget,

    'check': CheckWidget,
    'switch': SwitchWidget,
    'profile': ProfilePicture,
};

export default WidgetHub;
