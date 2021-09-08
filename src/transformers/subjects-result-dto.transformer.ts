import { plainToClass } from 'class-transformer';

import { SubjectsResultDto } from '@business/logged-user/dto/output/subjects.result.dto';
import { ChapterSubjectSelectType } from '@database/selects/chapter-subject.select';

export const subjectsResultDtoTransformer = (
  subjects: Array<ChapterSubjectSelectType>,
): SubjectsResultDto =>
  plainToClass(SubjectsResultDto, {
    data: subjects.map((subject) => ({
      ...subject,
      discussion: subject.discussion.map((discussion) => ({
        id: discussion.id,
        idUser: discussion.idUser,
        comment: discussion.comment,
        link: discussion.link,
        createdAt: discussion.createdAt,
        userFullname: discussion.user?.fullName,
        userEmail: discussion.user?.email,
      })),
    })),
  });
