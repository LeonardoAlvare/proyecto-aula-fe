import { Card } from "primereact/card";
import FooterCard from "./footerCard";
import { Project } from "../../store/project/types";
import { formatCurrency, formatDate } from "../../helpers/util";

interface Props {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  onApply?: (project: Project) => void;
  hideFooter?: boolean;
}

function ProjectCard({
  project,
  hideFooter = false,
  onApply,
  onDelete,
  onEdit,
}: Props) {
  return (
    <Card
      key={project._id}
      title={project.name}
      className="mt-4"
      footer={
        !hideFooter && (
          <FooterCard
            project={project}
            onApply={onApply}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )
      }
    >
      <p>{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.techs.map((tech) => (
          <span key={tech} className="bg-gray-200 p-1 px-4 rounded-lg">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-2 text-gray-500 text-sm mt-4">
        <time>{formatDate(project.dateInit.toString())}</time>-
        <time>{formatDate(project.dateEnd.toString())}</time>
      </div>

      <div className="flex mt-4">
        <span className="text-gray-500 text-2xl">
          <span className="text-2xl font-bold text-gray-500">
            Salario: {formatCurrency(project.salary)}
          </span>
        </span>
      </div>
    </Card>
  );
}

export default ProjectCard;
