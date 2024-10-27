import React, { useState, useEffect } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import {
  FETCH_VIEW_SAMPLE_REQUEST,
  FETCH_VIEW_SAMPLE_REQUEST_SUCCESS,
  FETCH_VIEW_SAMPLE_REQUEST_FAILURE,
  APPROVE_REJECT_QUOTE_SAMPLE,
  APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
  APPROVE_REJECT_QUOTE_SAMPLE_FAILURE,
  FILTER_SAMPLE,
  FILTER_SAMPLE_SUCCESS,
  FILTER_SAMPLE_FAILURE,
} from "@utils/actionType";
import API from "@services/axios";
import { toast } from "react-toastify";
import { quoteRequeststyle } from "./style";
import dropDownIcon from "@assets/images/down-arrow-red.svg";
import dropDownGrayIcon from "@assets/images/down-arrow-gray.svg";
import { useStore } from "@store/store";
import Loader from "@components/loader";
import NoData from "@components/no-data";
import CustomPagination from "@components/pagination";
import { utcToLocal, strToURL } from "@utils/commonFunctions";
import NoImage from "@assets/images/no-image.jpg";
import Popup from "./popup";
import { schema } from "@utils/schemas";
import validationSchema from "@utils/validationSchemas";
import { useFormik } from "formik";
import searchIcon from "@assets/images/magnifying-glass.svg";
import { useDebounce } from "@hooks/useDebounce";
import TimeStampPopup from "@components/time-stamp-popup/tspopup";

function SampleRequestVendor() {
  const classes = quoteRequeststyle();
  const [state, dispatch] = useStore();
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const [openPopup, setOpenPopup] = useState(false);
  const [vrmStatus, setVrmStatus] = useState({ id: null, status: null });
  const [count, setCount] = useState(0);
  const [expanded, setExpanded] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [openModel, setOpenModel] = useState(false);
  const [sampleData, setSampleData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleModelClose = () => {
    setOpenModel(false);
    setSampleData([]);
  };

  const openTimeStampModel = (id) => {
    setOpenModel(true);
    data.map((item) => {
      id === item.id && setSampleData(item?.sample_history);
      return {};
    });
  };

  const filterClient = () => {
    filterStatus === "All"
      ? search === ""
        ? getViewSampleRequest()
        : handleFilterStatus()
      : handleFilterStatus();
  };

  useDebounce(() => filterClient(), 1000, search);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getViewSampleRequest = () => {
    dispatch({ type: FETCH_VIEW_SAMPLE_REQUEST });
    API.get(`/sample_management/get-sample?page=${page}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FETCH_VIEW_SAMPLE_REQUEST_SUCCESS,
            payload: response.data.data,
          });
          setData(response.data.data);
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({
            type: FETCH_VIEW_SAMPLE_REQUEST_FAILURE,
            payload: response.data.errorMessage,
          });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_VIEW_SAMPLE_REQUEST_FAILURE, payload: error });
      });
  };

  useEffect(() => {
    filterStatus === "All"
      ? search === ""
        ? getViewSampleRequest()
        : handleFilterStatus()
      : handleFilterStatus(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterStatus]);

  const shippedFormik = useFormik({
    initialValues: schema.requestSampleShippedSchema,
    validationSchema: validationSchema.requestSampleShippedValidationSchema,
    onSubmit: (value) => {
      handleStatusRequest(vrmStatus.id, vrmStatus.status, value);
    },
  });

  const handleSampleStatus = (id, e) => {
    const status = e.target.value;
    if (status === "Pending" || status === "In Progress") {
      handleStatusRequest(id, status);
    } else {
      setVrmStatus({ id, status });
      setOpenPopup(true);
    }
  };

  const handleStatusRequest = (id, status, value) => {
    let data;
    if (status === "Pending" || status === "In Progress") {
      data = { status };
    } else if (status === "Shipped") {
      data = {
        status,
        tracking_url: value?.tracking_url,
      };
    }
    dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE });
    API.post(`/sample_management/update-sample-status/${id}`, data)
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: APPROVE_REJECT_QUOTE_SAMPLE_SUCCESS,
          });
          toast.success(response.data.successMessage);
          filterStatus === "All"
            ? search === ""
              ? getViewSampleRequest()
              : handleFilterStatus()
            : handleFilterStatus();
        } else {
          dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: APPROVE_REJECT_QUOTE_SAMPLE_FAILURE });
        toast.error("Some thing went wrong");
      });
    closeConfirmPopup();
  };

  const handleFilterStatusAndPage = (e) => {
    setPage(1);
    setFilterStatus(e.target.value);
  };

  const handleFilterStatus = () => {
    dispatch({ type: FILTER_SAMPLE });
    API.post(`sample_management/filter-sample?page=${page}`, {
      ...(filterStatus !== "All" ? { status: filterStatus } : { status: "" }),
      sample_client_name: search,
    })
      .then((response) => {
        if (response.data.statusCode === 200) {
          dispatch({
            type: FILTER_SAMPLE_SUCCESS,
            payload: response.data.data,
          });
          setData(response.data.data);
          setCount(response?.data?.totalPageCount);
        } else {
          dispatch({ type: FILTER_SAMPLE_FAILURE });
          toast.error(response.data.errorMessage);
        }
      })
      .catch((err) => {
        dispatch({ type: FILTER_SAMPLE_FAILURE });
        toast.error("Some thing went wrong");
      });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const closeConfirmPopup = () => {
    setOpenPopup(false);
    shippedFormik.handleReset();
    setVrmStatus({ id: null, status: null });
  };

  return (
    <div className={classes.quoteRequestWrapper}>
      <Header />
      <Loader
        loading={
          state?.quotes?.loadingViewSampleRequest ||
          state?.quotes?.accessRequesting
        }
      />
      <div className="quote-page-wrapper">
        <div className="container">
          <div className="heading">
            <Typography variant="h1">Sample Request</Typography>
            <div className="search-wrapper">
              <div className="form-wrapper">
                <div className="form-group">
                  <TextField
                    id="search"
                    type="search"
                    variant="outlined"
                    placeholder="SEARCH"
                    value={search}
                    onChange={handleSearch}
                  />
                  <img src={searchIcon} alt="search icon" />
                </div>
              </div>
              <div className="form-group">
                <InputLabel className="status-label">
                  Filter By Status
                </InputLabel>
                <TextField
                  select
                  id="filter-status"
                  name="filter-status"
                  type="text"
                  variant="outlined"
                  onChange={(e) => handleFilterStatusAndPage(e)}
                  value={filterStatus}
                >
                  <MenuItem key={0} value="All">
                    Show All
                  </MenuItem>
                  <MenuItem key={1} value="Pending">
                    Pending
                  </MenuItem>
                  <MenuItem key={1} value="In Progress">
                    In Progress
                  </MenuItem>
                  <MenuItem key={1} value="Shipped">
                    Shipped
                  </MenuItem>
                </TextField>
              </div>
            </div>
          </div>
          <div className="quote-request-list">
            {!!data?.length ? (
              data.map((data, index) => {
                return (
                  <div className="quote-request-item" key={index}>
                    <div className="white-box">
                      <Accordion
                        expanded={expanded === index}
                        onChange={handleChange(index)}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                        >
                          <div className="quote-heading">
                            <div className="quote-title-block">
                              <Typography variant="h2">
                                {`Sample Request from ${data?.user?.first_name} ${data?.user?.last_name}`}
                              </Typography>
                            </div>
                            <div className="down-arrow-wrapper">
                              <img
                                src={dropDownIcon}
                                alt="drop-down-arrow"
                                className="open-dropdown"
                              />
                              <img
                                src={dropDownGrayIcon}
                                alt="drop-down-arrow"
                                className="close-dropdown"
                              />
                            </div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="quote-content">
                            <div className="quote-list-item" key={index}>
                              <div className="left-block">
                                <div className="left-title-inner brand-inner">
                                  <p className="title">Brand:</p>
                                  <div className="brand-container">
                                    <Typography variant="h3">
                                      {data?.supplier?.name}
                                    </Typography>
                                    <em>
                                      <img
                                        src={
                                          data?.supplier?.image
                                            ? data?.supplier?.image
                                            : NoImage
                                        }
                                        alt={index}
                                      />
                                    </em>
                                  </div>
                                </div>
                                <div className="left-title-inner">
                                  <p className="title">Date:</p>
                                  <div className="value-container">
                                    <Typography variant="h3">
                                      {utcToLocal(
                                        data?.created_at,
                                        "MMMM DD, YYYY"
                                      )}
                                    </Typography>
                                  </div>
                                </div>
                                <div className="left-title-inner">
                                  <p className="title">Company:</p>
                                  <div className="value-container">
                                    <Typography variant="h3">
                                      {data?.user?.company
                                        ? data?.user?.company
                                        : "N/A"}
                                    </Typography>
                                  </div>
                                </div>
                                <div className="left-title-inner">
                                  <p className="title">Phone:</p>
                                  <div className="value-container">
                                    <Typography variant="h3">
                                      {data?.user?.phone
                                        ? data?.user?.phone
                                        : "N/A"}
                                    </Typography>
                                  </div>
                                </div>
                                <div className="left-title-inner">
                                  <p className="title">Staff Member:</p>
                                  <div className="value-container">
                                    <Typography variant="h3">
                                      new staff
                                    </Typography>
                                  </div>
                                </div>
                                <div className="left-title-inner">
                                  <p className="title">Address:</p>
                                  <div className="value-container">
                                    <Typography variant="h3">
                                      {!!data?.address ? data?.address : "N/A"}
                                    </Typography>
                                  </div>
                                </div>
                                <div className="left-title-inner">
                                  <p className="title">Notes:</p>
                                  <div className="value-container">
                                    <Typography variant="h3">
                                      {!!data?.notes ? data?.notes : "N/A"}
                                    </Typography>
                                  </div>
                                </div>
                                <div className="shipping-details">
                                  <div className="details-heading">
                                    <div className="heading">
                                      Shipping Details
                                    </div>
                                    <Button
                                      color="primary"
                                      className="primary-border-btn back-btn"
                                      style={{ marginRight: "-15px" }}
                                      onClick={() =>
                                        openTimeStampModel(data?.id)
                                      }
                                    >
                                      History
                                    </Button>
                                  </div>
                                  <div className="left-title-inner">
                                    <p className="title">
                                      Cost to Ship Samples:
                                    </p>
                                    <div className="value-container">
                                      <Typography variant="h3">
                                        {!!data?.charge_amount
                                          ? `$${data?.charge_amount} USD`
                                          : "N/A"}
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="left-title-inner">
                                    <p className="title">Traking URL:</p>
                                    <div className="value-container">
                                      <Typography variant="h3">
                                        {!!data?.tracking_url ? (
                                          <a
                                            href={strToURL(
                                              data?.tracking_url,
                                              "https://"
                                            )}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            {data?.tracking_url}
                                          </a>
                                        ) : (
                                          "N/A"
                                        )}
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="right-block">
                                <div className="right-inner">
                                  <div className="form-group">
                                    <InputLabel className="status-label">
                                      Your Status
                                    </InputLabel>
                                    <TextField
                                      select
                                      id="your-status"
                                      name="your-status"
                                      type="text"
                                      variant="outlined"
                                      onChange={(e) =>
                                        handleSampleStatus(data?.id, e)
                                      }
                                      value={data?.vrm_status}
                                      disabled={data?.vrm_status === "Shipped"}
                                    >
                                      {data?.vrm_status !== "Shipped" && (
                                        <MenuItem
                                          key={0}
                                          value={data?.vrm_status}
                                          disabled
                                        >
                                          {data?.vrm_status}
                                        </MenuItem>
                                      )}
                                      <MenuItem key={1} value="In Progress">
                                        In Progress
                                      </MenuItem>
                                      <MenuItem key={2} value="Shipped">
                                        Shipped
                                      </MenuItem>
                                    </TextField>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                );
              })
            ) : (
              <NoData text="No sample request found" />
            )}
          </div>
          {!!data?.length && (
            <CustomPagination
              count={count}
              page={page}
              onChange={handleChangePage}
            />
          )}
        </div>
      </div>
      <Popup
        open={openPopup}
        handleClose={closeConfirmPopup}
        statusData={vrmStatus}
        formik={shippedFormik}
      />
      <TimeStampPopup
        open={openModel}
        handleClose={handleModelClose}
        data={sampleData}
      />
      <Footer />
    </div>
  );
}

export default SampleRequestVendor;
