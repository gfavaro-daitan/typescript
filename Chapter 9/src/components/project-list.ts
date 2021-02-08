import { Draggable,DragTarget } from "../models/drag-drop.js";
import { Component } from "./base-component.js";
import { Project, ProjectStatus } from "../models/project.js";
import { autobind } from "../decorators/autobind.js";
import { validate, Validatable } from "../util/validation.js";
import { projectState, ProjectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";


export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element
        .querySelector("ul")!
        .classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.active : ProjectStatus.finished
    );
  }

  @autobind
  dragleaveHandler(_: DragEvent) {
    const listEl = this.element
      .querySelector("ul")!
      .classList.remove("droppable");
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-lists`)!;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragleaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.active;
        }
        return prj.status === ProjectStatus.finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-lists`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS ";
  }
}
