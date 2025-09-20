declare namespace Backend {

    declare namespace TType {

        type Integer<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Integer<N>;
        type Char<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Char<N>;
        type Float<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Float<N>;
        type Boolean<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Boolean<N>;
        type Date<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Date<N>;
        type DateTime<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Datetime<N>;
        type Time<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Time<N>;
        type Duration<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Duration<N>;
        type Text<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Text<N>;
        type Selection<O extends string, N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Selection<O, N>;
        type File<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.File<N>;
        type Many2One<N extends IACele.Data._Base._NullabilityKey = 'null_'> = IACele.Data.Models.TType.Many2One<N>;
        type One2Many<M extends ModelName> = IACele.Data.Models.TType.One2Many<M>;
        type Many2Many<M extends ModelName> = IACele.Data.Models.TType.Many2Many<M>;

    };

    interface Models {

        'base.model': {
            model: TType.Char<'not_null'>;
            label: TType.Char<'not_null'>;
            description: TType.Char;
            state: TType.Selection<_Selection.CreateState, 'not_null'>;
            field_ids: TType.One2Many<'base.model.field'>;
            related_field_ids: TType.One2Many<'base.model.field'>;
        };

        'base.model.field': {
            model_id: TType.Many2One<'not_null'>;
            label: TType.Char<'not_null'>;
            ttype: TType.Selection<IACele.Data.Models.TTypeName, 'not_null'>;
            nullable: TType.Boolean<'not_null'>;
            is_required: TType.Boolean<'not_null'>;
            default_value: TType.Char;
            unique: TType.Boolean<'not_null'>;
            readonly: TType.Boolean<'not_null'>;
            help_info: TType.Char;
            related_model_id: TType.Many2One;
            related_field: TType.Char;
            state: TType.Selection<_Selection.CreateState, 'not_null'>;
            selection_ids: TType.One2Many<'base.model.field.selection'>;
        };

        'base.model.field.selection': {
            label: TType.Char<'not_null'>;
            field_id: TType.Many2One<'not_null'>;
        };

        'base.users': {
            login: TType.Char<'not_null'>;
            password: TType.Char<'not_null'>;
            active: TType.Boolean<'not_null'>;
            sync: TType.Boolean<'not_null'>;
            role_ids: TType.Many2Many<'base.users.role'>;
            odoo_id: TType.Integer;
            birthday_date: TType.Date;
        };

        'base.users.role': {
            group_ids: TType.Many2Many<'base.model.access.groups'>;
        };

        'base.model.access': {
            model_id: TType.Many2One<'not_null'>;
            label: TType.Char<'not_null'>;
        };

        'base.model.access.groups': {
            permission_ids: TType.Many2Many<'base.model.access'>;
        };

        'carpentry.project': {
            done_activities: TType.Integer<'not_null'>;
            user_id: TType.Many2One;
            total_time: TType.Duration<'not_null'>;
            remaining_time: TType.Duration<'not_null'>;
            remaining_activities: TType.Integer<'not_null'>;
            activity_ids: TType.One2Many<'carpentry.activity.line'>;
        };

        'carpentry.activity.line': {
            sequence: TType.Integer<'not_null'>;
            start_date: TType.DateTime<'not_null'>;
            duration: TType.Duration<'not_null'>;
            end_date: TType.DateTime<'not_null'>;
            done: TType.Boolean<'not_null'>;
            project_id: TType.Many2One<'not_null'>;
            is_unattended: TType.Boolean<'not_null'>;
        };

        'schedule.journey': {
            start_time: TType.Time;
            end_time: TType.Time;
            description: TType.Text;
        };

        'schedule.day': {
            day: TType.Selection<_Selection.DayName>;
            journey_id: TType.Many2One;
            is_holiday: TType.Boolean<'not_null'>;
        };

        'schedule.week': {
            assigned_days: TType.Many2Many<'schedule.day'>;
            total_hours: TType.Integer<'not_null'>;
        };

    };

    declare namespace _Selection {

        type CreateState = (
            | 'base'
            | 'generic'
        );

        type DayName = (
            | 'monday'
            | 'tuestday'
            | 'wednesday'
            | 'thursday'
            | 'wednesday'
            | 'saturday'
            | 'sunday'
        );

    };

};