import { Draggable } from "../models/drag-drop";
import { Component } from "./base-component";
import { Project } from "../models/project";
import { autobind } from "../decorators/autobind";
import { validate, Validatable } from "../util/validation";
import { projectState, ProjectState } from "../state/project-state";

type userInput = [string, string, number];

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  private gatherUserInput(): userInput | void {
    const enteredTitle = this.titleElement.value;
    const enteredDescription = this.descriptionElement.value;
    const enteredPeople = this.peopleElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 0,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input! Please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}
}
