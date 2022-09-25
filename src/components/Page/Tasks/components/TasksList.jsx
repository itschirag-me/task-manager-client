import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Edit, Plus } from "react-feather";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  TaskListService,
  TaskStatusUpdateService,
} from "../../../../services/TaskService";
import Button from "../../../common/Button/Button";
import Input from "../../../common/Input";
import Modal from "../../../common/Modal";
import TaskCard from "../common/TaskCard";

const TasksList = () => {
  const navigator = useNavigate();
  const [currentModalPayload, setCurrentModalPayload] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [tasksList, setTasksList] = useState([]);

  const fetchTasks = async () => {
    const response = await TaskListService();
    if (!response?.isSuccess) {
      toast.error(response?.errorMessage || "Something went wrong");
      return;
    }

    setTasksList(response?.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenModal = (payload) => {
    if (isOpenModal) {
      setIsOpenModal(false);
    } else {
      setCurrentModalPayload(payload);
      setIsOpenModal(true);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (destination.droppableId !== source.droppableId) {
      // TO OTHER COLUMN
      const column = tasksList.find(
        (item) => item?._id === source?.droppableId
      );
      const destColumn = tasksList.find(
        (item) => item?._id === destination?.droppableId
      );
      const copiedItems = [...column.item];
      const [removed] = copiedItems.splice(source.index, 1);
      const newTasksList = tasksList.map((item) => {
        if (item?._id === source?.droppableId) {
          return { ...item, item: copiedItems };
        }
        if (item?._id === destination?.droppableId) {
          const otherItems = [...item.item];
          otherItems.splice(destination.index, 0, removed);
          return { ...item, item: [...otherItems] };
        }
        return item;
      });
      setTasksList([...newTasksList]);
      await TaskStatusUpdateService(draggableId, {
        status: destColumn?.value,
      });
    } else {
      // TO SAME COLUMN
      const column = tasksList.find(
        (item) => item?._id === source?.droppableId
      );
      const copiedItems = [...column.item];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      const newTasksList = tasksList.map((item) => {
        if (item?._id === source?.droppableId) {
          return { ...item, item: copiedItems };
        }
        return item;
      });
      setTasksList([...newTasksList]);
      await TaskStatusUpdateService(draggableId, {
        status: column?.value,
      });
    }
  };

  const textStyleWithType = (param) => {
    switch (param) {
      case "urgent":
        return "text-blue-400";
      case "story":
        return "text-green-400";
      case "bug":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <React.Fragment>
      <div className="w-full h-auto p-2 xl:px-5 lg:px-5 md:px-4 sm:px-3 px-2 overflow-auto no-scrollbar">
        <div className="min-h-20 flex flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-col items-start justify-center xl:items-center lg:items-center md:items-center sm:items-start xl:justify-between lg:justify-between md:justify-between sm:justify-center xl:gap-0 lg:gap-0 md:gap-0 sm:gap-2 gap-2">
          <h3 className="text-xl text-secondary">My tasks</h3>
          <div className="flex w-full xl:w-auto lg:w-auto md:w-auto sm:w-full items-center sm:justify-between justify-between gap-3 xl:gap-5 lg:gap-5 md:gap-5 sm:gap-4">
            <Input name="search" label="Search tasks" marginBottom="0" />
            <Button
              type="button"
              className="xl:text-base lg:text-base md:text-base sm:text-sm text-xs gap-1"
              onClick={() => navigator("add-task")}
              icon={<Plus className="w-5 xl:w-6 lg:w-6 md:w-5 sm:w-6" />}
            >
              Add Task
            </Button>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div
            className={`grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1  gap-8 py-2 h-full mt-6`}
          >
            {tasksList.map((list, index) => (
              <Droppable key={list?._id} droppableId={list?._id}>
                {(provider, snapshot) => (
                  <div
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                    className="bg-white h-full rounded shadow overflow-hidden min-h-[40rem]"
                  >
                    <h1 className="bg-primary text-base font-medium p-3 py-1 text-white shadow uppercase">
                      {list?.label}
                    </h1>
                    <div className="overflow-hidden h-full p-2 py-3">
                      {list?.item.map((task, index) => (
                        <Draggable
                          key={task?._id}
                          draggableId={task?._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <TaskCard
                              key={task?._id}
                              onClick={() => handleOpenModal(task)}
                              dragRef={provided.innerRef}
                              task={task}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provider.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
        <Modal
          className="w-1/3"
          isOpen={isOpenModal}
          closeModal={handleOpenModal}
          modalTitle={
            <div className="flex items-center justify-between">
              <span
                className={`text-gray-500 text-sm`}
              >
                {currentModalPayload?.taskNo}
              </span>
              <Edit className="w-5 h-5 text-gray-400" />
            </div>
          }
        >
          <div className="mt-3">
            <span className="text-lg font-medium flex mb-4 text-secondary">
              {currentModalPayload?.heading}
            </span>
            <p className="p-3 rounded bg-slate-100 text-gray-500">
              {currentModalPayload?.description}
            </p>
            <div className="p-2">
              <div className="text-sm text-gray-500 font-medium uppercase">
                PERMISSION to view
              </div>
              {currentModalPayload?.permittedTo?.map(({ userId }) => {
                return (
                  <>
                    <div className="px-2 py-1 rounded-full inline-block bg-gray-200 mt-2 mr-3">
                      <span className="inline-block w-7 h-7 rounded-full overflow-hidden align-middle">
                        <img src={userId.profilePicture} />
                      </span>
                      <span className="text-gray-500 align-middle mx-2">
                        {userId.name}
                      </span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default TasksList;
