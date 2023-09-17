export type ClickupTimeTrackedEvent = {
  event: string;
  history_items: {
    id: string;
    type: number;
    date: string;
    field: string;
    parent_id: string;
    data: {
      total_time: string;
      rollup_time: string;
    };
    source: string;
    user: {
      id: string;
      username: string;
      email: string;
      color: string;
      initials: string;
      profilePicture: string;
    };
    before: null;
    after: {
      id: string;
      start: string;
      end: string;
      time: string;
      source: string;
      date_added: string;
    };
  }[];
  task_id: string;
  data: {
    description: string;
    interval_id: string;
  };
  webhook_id: string;
};
