import { useEffect, useState } from "react";
import useProjectStore from "../../store/project/project.store";

import { Button } from "primereact/button";
import ProjectCard from "../../components/project-card/ProjectCard";
import useAuthStore from "../../store/auth/auth.store";
import ProjectForm from "../../components/project-form/ProjectForm";
import { Project } from "../../store/project/types";
import { useConfirmDialog } from "../../components/confirm-dialog/ConfirmDialog";
import useProposalStore from "../../store/proposal/proposal.store";
import { ProposalDto } from "../../store/proposal/types";

function Home() {
  const getAllProjects = useProjectStore((state) => state.getAllProjects);
  const getProjectByUserId = useProjectStore(
    (state) => state.getProjectByUserId
  );
  const userLogged = useAuthStore((state) => state.userLogged);
  const projects = useProjectStore((state) => state.projects);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const createProposal = useProposalStore((state) => state.createProposal);
  const [showForm, setShowForm] = useState(false);
  const [projectSelected, setProjectSelected] = useState<Project | undefined>(
    undefined
  );
  const { showConfirmDialog } = useConfirmDialog();

  useEffect(() => {
    if (userLogged?.isFreelancer) {
      getAllProjects();
    } else {
      getProjectByUserId(userLogged?._id!);
    }
  }, [userLogged]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const onHideForm = () => {
    setShowForm(false);
    setProjectSelected(undefined);
  };

  const onEdit = (projectId: Project) => {
    setProjectSelected(projectId);
    setShowForm(true);
  };

  const onDelete = (projectId: Project) => {
    showConfirmDialog({
      header: "Eliminar proyecto",
      message: "¿Estás seguro de eliminar este proyecto?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        deleteProject(projectId._id);
      },
    });
  };

  const onApply = (projectId: Project) => {
    showConfirmDialog({
      header: "Postular a proyecto",
      message: "¿Estás seguro de postularte a este proyecto?",
      icon: "pi pi-info-circle",
      accept: () => {
        const payload: ProposalDto = {
          userId: userLogged?._id!,
          projectId: projectId._id,
          nameProject: projectId.name,
          userName: `${userLogged?.name} ${userLogged?.lastname}`,
          userEmail: userLogged?.email!,
        };

        createProposal(payload);
      },
    });
  };

  return (
    <section>
      <div className="w-full flex justify-end items-center">
        <Button
          label="Publicar proyecto"
          icon="pi pi-plus"
          iconPos="right"
          onClick={handleShowForm}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onApply={onApply}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <section className="w-full flex flex-col justify-center items-center mt-40">
          <figure className="w-1/2">
            <img
              src="/empty.svg"
              alt="No hay proyectos"
              className="w-full h-32"
            />
          </figure>
          <h1 className="text-3xl font-bold text-gray-500">No hay proyectos</h1>
        </section>
      )}

      <ProjectForm
        defaultValues={projectSelected}
        visible={showForm}
        onHide={onHideForm}
      />
    </section>
  );
}

export default Home;
