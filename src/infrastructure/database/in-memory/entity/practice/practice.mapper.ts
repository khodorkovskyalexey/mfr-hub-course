import { Id, Practice, Url } from '../../../../../domain';
import { PracticeOrmEntity } from './practice.orm-entity';

export class PracticeMapper {
    static toOrmEntity(course: Practice): PracticeOrmEntity {
        const { id, name, description, url } = course.unpack();

        const ormPractice = new PracticeOrmEntity(
            id.value,
            name,
            description,
            url.value,
        );

        return ormPractice;
    }

    static toDomainEntity(ormPractice: PracticeOrmEntity): Practice {
        const practice = new Practice({
            id: new Id(ormPractice.id),
            name: ormPractice.name,
            description: ormPractice.description,
            url: new Url(ormPractice.url),
        });

        return practice;
    }
}
