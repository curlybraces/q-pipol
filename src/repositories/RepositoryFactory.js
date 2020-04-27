import AuthRepository from './AuthRepository';
import DirectoryRepository from './DirectoryRepository';
import ProjectRepository from './ProjectRepository';
import ResourceRepository from './ResourceRepository';
import UserRepository from './UserRepository';

const repositories = {
  auth: AuthRepository,
  directories: DirectoryRepository,
  projects: ProjectRepository,
  resources: ResourceRepository,
  users: UserRepository
};

export default {
  get: name => repositories[name]
};
