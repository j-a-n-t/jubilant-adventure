import { Injectable } from "@nestjs/common";
import { CreateTaskInput } from "../dto/inputs/create.task.input";
import { CreateTaskDto } from "../dto/create.task.dto";
import { TaskDto } from "../dto/task.dto";
import { TaskEntity } from "../entities/task.entity";
import { EditTaskDto } from "../dto/edit.task.dto";
import { EditTaskInput } from "../dto/inputs/edit.task.input";

@Injectable()
class TaskAdapter {
  public createTaskInputToDto(createTaskInput: CreateTaskInput): CreateTaskDto {
    return {
      tarea: createTaskInput.task,
      titulo: createTaskInput.title
    };
  }

  public editTaskInputToDto(editTaskInput: EditTaskInput): EditTaskDto {
    return {
      taskId: editTaskInput.taskId,
      tarea: editTaskInput.task,
      titulo: editTaskInput.title
    };
  }

  public TaskDtoToEntity(taskDto: TaskDto): TaskEntity {
    return {
      taskId: taskDto._id,
      title: taskDto.titulo,
      task: taskDto.tarea,
      createAt: taskDto.creado,
      updateAt: taskDto.actualizado
    };
  }

  public TasksDtoToEntity(taskDto: TaskDto[]): TaskEntity[] {
    return taskDto.map(task => {
      return {
        taskId: task._id,
        title: task.titulo,
        task: task.tarea,
        createAt: task.creado,
        updateAt: task.actualizado
      };
    });
  }
}

export { TaskAdapter };
