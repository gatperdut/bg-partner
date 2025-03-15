import { SchoolShortValue, SchoolValue } from '@tables/school';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffSchoolData = ComponentData & {
  school: string;

  schoolShort: string;
};

export class BuffSchool extends Component {
  protected buffSchoolData: BuffSchoolData;

  constructor(school: SchoolValue, schoolShort: SchoolShortValue) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffSchool);

    this.buffSchoolData = {
      ...this.componentData,
      school: school,
      schoolShort: schoolShort,
    };

    this.html = compiled(this.buffSchoolData);
  }
}
