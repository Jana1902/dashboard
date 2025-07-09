import { useEffect, useState } from "react";
import { Card, Input, Skeleton, Button, Select } from "antd";
import { dashboardContext } from "../context";

const Dashboard = () => {
  const { isLoadingComments, comments } = dashboardContext();

  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [pageSize, setPageSize] = useState(
    parseInt(localStorage.getItem("pageSize")) || 10
  );
  const [sortConfig, setSortConfig] = useState(
    JSON.parse(localStorage.getItem("sortConfig")) || { key: null, direction: null }
  );

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("pageSize", pageSize);
    localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
  }, [searchQuery, currentPage, pageSize, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  const filteredComments = comments?.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.body.toLowerCase().includes(query)
    );
  });

  const sortedComments = [...(filteredComments || [])];
  if (sortConfig.key && sortConfig.direction) {
    sortedComments.sort((a, b) => {
      const aVal =
        sortConfig.key === "postId" ? a.postId : a[sortConfig.key].toLowerCase();
      const bVal =
        sortConfig.key === "postId" ? b.postId : b[sortConfig.key].toLowerCase();

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

 console.log(sortConfig);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedComments = sortedComments.slice(startIndex, endIndex);

  const totalPages = Math.ceil((sortedComments.length || 1) / pageSize);

  if (isLoadingComments) {
    return (
      <div className="w-11/12 mx-auto mt-8">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto mt-8 space-y-4">
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 mb-4">
          <div className="flex space-x-2">
            <Button onClick={() => handleSort("postId")}>Sort Post ID</Button>
            <Button onClick={() => handleSort("name")}>Sort Name</Button>
            <Button onClick={() => handleSort("email")}>Sort Email</Button>
          </div>
          <Input
            placeholder="Search name, email, comment"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Post ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Comment</th>
            </tr>
          </thead>
          <tbody>
            {paginatedComments.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-2 border">{c.postId}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">{c.body.slice(0, 50)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div>
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="mr-2"
            >
              Previous
            </Button>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Select
              value={pageSize}
              onChange={(value) => {
                setPageSize(value);
                setCurrentPage(1);
              }}
              options={[
                { value: 10, label: "10 / Page" },
                { value: 50, label: "50 / Page" },
                { value: 100, label: "100 / Page" },
              ]}
              style={{ width: 120 }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
