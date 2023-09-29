import { IsNumberString, IsString, Matches } from 'class-validator';

export class IdParam {
  @IsNumberString()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class RangeParam {
  @Matches(/\d{4}-\d{2}$/, {
    message: 'startMonth format should be in YYYY-MM',
  })
  startMonth: string;

  @Matches(/\d{4}-\d{2}$/, { message: 'endMonth format should be in YYYY-MM' })
  endMonth: string;

  constructor(startMonth: string, endMonth: string) {
    this.startMonth = startMonth;
    this.endMonth = endMonth;
  }
}

export class TaskParam {
  @IsString()
  task: string;

  @IsString()
  @Matches(/^(OPEN|IN_PROGRESS|COMPLETED)$/, {
    message: `status shoule be one of 'OPEN', 'IN_PROGRESS', 'COMPLETED'`,
  })
  status: string;
}

export class PageParam {
  @IsNumberString()
  pageSize: number;

  @IsNumberString()
  currentPage: number;

  constructor(pageSize: number, currentPage: number) {
    this.pageSize = pageSize;
    this.currentPage = currentPage;
  }
}
