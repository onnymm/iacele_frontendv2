import { CharWidget, CheckWidget, DatetimeWidget, DateWidget, DurationWidget, FloatWidget, IntegerWidget, Many2OneWidget, One2ManyTagsWidget, SelectionWidget, SwitchWidget, TextWidget, TimeWidget } from "./form/Widgets";

const Widgets = {
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

    'check': CheckWidget,
    'switch': SwitchWidget,
};

export default Widgets;
