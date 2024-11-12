import React, { useEffect, useState } from 'react';
import Modal from '../../component/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { editJob, fetchJobs } from '../../Slices/jobSlice';
import InputField from '../../component/InputField';

const EditJob = ({ isOpen, setIsOpen, selectedJobId }) => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);
  const selectedJob = jobs.find((jobItem) => jobItem.id === selectedJobId);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (selectedJob) {
      setFormData({
        title: selectedJob.title,
        description: selectedJob.description,
        price: selectedJob.price,
      });
    }
  }, [selectedJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    }));
  };

  const validateForm = (data) => {
    let error = {};
    if (!data.title) {
      error.title = 'Title must be provided';
    }
    if (!data.description) {
      error.description = 'Description must be provided';
    }
    if (!data.price) {
      error.price = 'Price must be provided';
    }
    return error;
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const validate = validateForm(formData);
    setFormErrors(validate);
    if (Object.keys(validate).length === 0) {
      try {
        await dispatch(editJob({ formData, jobId: selectedJob.id }));
        dispatch(fetchJobs());
        setFormData({
          title: '',
          description: '',
          price: '',
        });
        setIsOpen(false); // Close the modal after successful submission
      } catch (error) {
        console.error('Error updating job:', error);
      }
    }
  };

  return (
    <Modal open={isOpen} setIsOpen={setIsOpen} title="Edit Job">
      <form action="" method="post" onSubmit={handleSubmission}>
        <InputField
          type="text"
          name="title"
          placeholder="Enter job title"
          value={formData.title}
          handleChange={handleChange}
          errorname={formErrors.title}
        />

        <InputField
          type="text"
          name="description"
          placeholder="Enter job description"
          value={formData.description}
          handleChange={handleChange}
          errorname={formErrors.description}
        />

        <InputField
          type="number"
          name="price"
          placeholder="Enter the job price"
          value={formData.price}
          handleChange={handleChange}
          errorname={formErrors.price}
        />

        <button
          type="submit"
          className="bg-blue-800 py-1 px-3 rounded-lg text-white capitalize"
        >
          Edit Job
        </button>
      </form>
    </Modal>
  );
};

export default EditJob;
