app.route("/employee-master", employeeRouter);
app.route("/sales-partner", salesPartnerRouter);
app.route("/sales-team", salesTeamRouter);
app.route("/contact-manager", contactsRouter);
app.route("/requirements", requirementsRouter);
app.route("/user", usersRouter);

these are the routes using / or /:id for put , delete, get single
need to generate queries like this for frontend
export const fetchRolesQuery = async () => {
  const { data } = await axiosInstance.get<Role[]>('/roles');
  return data;
};

export const postClusterQuery = async (data: Cluster) => {
  const { data: response } = await axiosInstance.post<Cluster>('/clusters', data);
  return response;
};

export const putTankQuery = async (id: number, data: TankData) => {
  const { data: response } = await axiosInstance.put<TankData>(`/tanks/${id}`, data);
  return response;
};
export const deleteClusterQuery = async (id: number) => {
  const { data } = await axiosInstance.delete<{ message: string }>(`/clusters/${id}`);
  return data;
};