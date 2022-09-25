export const notificationData = [
  {
    _id: "notice01",
    title: "Notice 1",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste quos hic neque eligendi similique beatae doloremque odit laboriosam. Rerum et adipisci delectus doloremque labore culpa qui! Veritatis quibusdam enim quidem.",
    createdAt: new Date(),
  },
  {
    _id: "notice02",
    title: "Notice 2",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste quos hic neque eligendi similique beatae doloremque odit laboriosam. Rerum et adipisci delectus doloremque labore culpa qui! Veritatis quibusdam enim quidem.",
    createdAt: new Date(),
  },
  {
    _id: "notice03",
    title: "Notice 3",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste quos hic neque eligendi similique beatae doloremque odit laboriosam. Rerum et adipisci delectus doloremque labore culpa qui! Veritatis quibusdam enim quidem.",
    createdAt: new Date(),
  },
  {
    _id: "notice04",
    title: "Notice 4",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste quos hic neque eligendi similique beatae doloremque odit laboriosam. Rerum et adipisci delectus doloremque labore culpa qui! Veritatis quibusdam enim quidem.",
    createdAt: new Date(),
  },
];

export const userProfileData = {
  name: "Kareena",
  contact: {
    email: "imkareena@yopmail.com",
    contactNumber: "9876543210",
  },
  address: {
    address1: "E-2/404, 5th pusta",
    address2: "Delhi, India",
  },
  profilePicture:
    "https://images.unsplash.com/photo-1663070421675-5b6420a9a0a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
};

export const objectToQuery = (object) => {
  const params = new URLSearchParams(object);
  return params.toString();
};

export const TASK_STATUS = [
  {
    _id: "1faedf43-3aec-4298-9a13-0005aff76a79",
    label: "To Do",
    value: "todo",
  },
  {
    _id: "f3d8da81-590f-47b5-a978-0dd62c23efbe",
    label: "In Progress",
    value: "inprogress",
  },
  {
    _id: "13c4d573-4d49-4474-ac1d-588b902192d3",
    label: "Testing",
    value: "testing",
  },
  { _id: "fec44b78-f602-42b9-a080-7724e7b5201e", label: "Done", value: "done" },
];

export const TASK_TYPE = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "story",
    label: "Story",
  },
];
