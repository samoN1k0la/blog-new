import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportRepository extends Repository<Report> {
  constructor(private readonly dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }

  async findByReporter(userId: string): Promise<Report[]> {
    return this.find({ where: { reportedBy: { id: userId } }, relations: ['reporter', 'post'] });
  }
}

