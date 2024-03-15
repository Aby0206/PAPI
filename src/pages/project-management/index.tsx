import React, { useState } from "react";
import {
  StyledContainer, StyledWrap, StyledList,
  StyledInputWrap,
} from "./styledComponents";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '../../assets/icons/material-symbols_add.svg';
import SettingIcon from '../../assets/icons/settings.svg';
import SearchIcon from '../../assets/icons/search.svg';
import EditIcon from '../../assets/icons/edit.svg';
import Title from '../../components/Title/title';
import NoListFound from '../../components/No-list-found';
import PaginationComp from '../../components/pagination';
import { useGetPaginatedProjectQuery } from "../../redux/services/Project"
import FormMultiSelect from "../../components/custom-form-multiselect"
import { formatDate } from "../../utils";

const tableColums = [
  {
    label: "Business Unit",
    id: "businessUnit",
    value: "businessUnit",
    valueType:"object"
  },
  {
    label: "Billing type",
    id: "billingType",
    value: "billingTypeName",
    valueType:"object"
  },
  {
    label: "domain",
    id: "domain",
    value: "domainName",
    valueType:"object"
  },
  {
    label: "Project Type",
    id: "projectType",
    value: "projectTypeName",
    valueType:"object"
  },
  {
    label: "Revenue Currency",
    id: "revenueCurrency",
    value: "currencyName",
    valueType:"object"
  },
  {
    label: "Project Description",
    id: "projectDescription",
    value: "projectDescription",
    valueType:""
  },
  {
    label: "Project Status",
    id: "projectStatus",
    value: "statusName",
    valueType:"object"
  },
  {
    label: "Actual Start Date",
    id: "actualStartDate",
    value: "actualStartDate",
    valueType:"date"
  },
  {
    label: "Actual end Date",
    id: "actualEndDate",
    value: "actualEndDate",
    valueType:"date"
  },

]

const ProjectManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [extraTableColumns, setExtraTableColumns] = useState<any>([]);

  const { data, isLoading, refetch } = useGetPaginatedProjectQuery({
    page: currentPage,
    limit: limit
  });
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 10) : 1;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const extraTableColumnHandler = (value: any) => {
    const columns = tableColums.filter((x: any) => value.includes(x.id));
    setExtraTableColumns([...columns])
  }


  return (
    <>
      <Title title="Project Management" />
      <StyledContainer>
        <StyledWrap>
          <StyledInputWrap>
            <div className="extra-inputs">
              <div className="table-column-input">
                <FormMultiSelect
                  label="Customize Table Columns"
                  showAsterisk={false}
                  options={tableColums}
                  nameKey="label"
                  searchPlaceholder="Search"
                  onChange={(e: any) => extraTableColumnHandler(e.target.value)}
                  value={extraTableColumns.map((e: any) => e.id)}
                ></FormMultiSelect>
              </div>
            </div>

            {/* </div> */}
            <Link to="add-project">
              <button className="fn-btn">
                <img src={AddIcon} alt="AddIcon" />
                <span> Add Project</span>
              </button>
            </Link>
          </StyledInputWrap>
          <StyledList>
            {isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <CircularProgress sx={{ color: '#4ABD95' }} />
              </div>
            ) : (
              <>
                {(data?.data?.length ?? 0) > 0 ? (
                  <TableContainer component={Paper} className="custom-paper">
                    <Table>
                      <TableHead>
                        <TableRow className="head-row">
                          <TableCell className="head-title">ID</TableCell>
                          <TableCell className="head-title name">Name</TableCell>
                          <TableCell className="head-title title">Manager</TableCell>
                          <TableCell className="head-title">Client Name</TableCell>
                          <TableCell className="head-title">Planned Start </TableCell>
                          <TableCell className="head-title">
                            Planner End
                          </TableCell>
                          {extraTableColumns && extraTableColumns.length ? extraTableColumns.map((column: any) => (
                            <TableCell className="head-title">
                              {column.label}
                            </TableCell>
                          )) : null}
                          <TableCell className="head-title">
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.data?.map((project: any) => (
                          <TableRow className="content-row" key={project.id}>
                            <TableCell>{project.id}</TableCell>
                            <TableCell className="name">
                              {/* <Link
                                to={`/project-management/add-project?id=${project.id}`}
                              > */}
                              {project?.projectName}
                              {/* </Link> */}
                            </TableCell>
                            <TableCell className="title">
                              {project?.projectManager || '-'}
                            </TableCell>
                            <TableCell>{project?.clientName || '-'}</TableCell>

                            <TableCell>
                              {formatDate(project?.plannedStartDate)}
                            </TableCell>
                            <TableCell>{formatDate(project?.plannedEndDate)}</TableCell>
                            {extraTableColumns && extraTableColumns.length ? extraTableColumns.map((column: any) => {
                              if (column?.valueType === "date")
                                return <TableCell >
                                  {formatDate(project?.[column.id])}
                                </TableCell>
                              else if (column?.valueType === "object")
                               return  <TableCell >
                                  {project?.[column.id]?.[column.value]}
                                </TableCell>
                              else
                               return <TableCell >
                                  {project?.[column.id]}
                                </TableCell>
                            }) : null}

                            <TableCell className="status-cell status">

                              <Link
                                to={`add-project?id=${project.id}`}
                              >
                                <button className="edit-btn">
                                  <img src={EditIcon} alt="Edit-icon" />
                                </button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <NoListFound isSearch={true} />
                )}

                {(data?.data?.length ?? 0) > 0 && (
                  <div className="pagination-wrap">
                    <PaginationComp
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </StyledList>
        </StyledWrap>

      </StyledContainer>
    </>
  )
};

export default ProjectManagement;