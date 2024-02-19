import { Modal, Button, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import UserService from '../../../redux/service/UserService';
import { setAllUser } from '../../../redux/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const EditComponent = ({ isOpen, onCancel, recordAction, userId }) => {
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const dispatch = useDispatch();
    const resData = useSelector((state) => state.user.allUser);
    const filteredUser = resData.find(user => user.id === userId);

    // Fetch user data when the component mounts
    useEffect(() => {
        handleGetUser();
    }, []);

    // Fetch all users and update the Redux store
    const handleGetUser = async () => {
        try {
            const response = await UserService.getAllUser();
            dispatch(setAllUser(response.data.data));
            console.log("Users fetched successfully", response);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpenEdit(false);
        // You can call the onCancel function here if needed
        if (onCancel) {
            onCancel();
        }
    };
    const handlOk = () => {

    }

    return (
        <Modal
        //     title={`Edit User 
        //     ${filteredUser.lastName && filteredUser.lastName.charAt(0).toUpperCase() + filteredUser.lastName.slice(1)}`
        // }
        title= "Edit user"
            visible={isOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handlOk}>
                    Save
                </Button>,
            ]}
        >
            {filteredUser ? (
                <div>
                    <h2 className="text-xl">Full Name: {filteredUser.firstName && filteredUser.firstName.charAt(0).toUpperCase() + filteredUser.firstName.slice(1)} {filteredUser.lastName && filteredUser.lastName.charAt(0).toUpperCase() + filteredUser.lastName.slice(1)}</h2>
                    
                    <div className='flex'>
                    <Card className='' title="Card title" bordered={false} style={{ width: 300 }}>
                        {
                            filteredUser.shift.map((item)=>(
                                <p>{item.name}</p>
                            ))
                        }
                    </Card>
                    <Card title="Card title" bordered={false} style={{ width: 300 }}>
                    {
                            filteredUser.subject.map((item)=>(
                                <p>{item.name}</p>
                            ))
                        }
                    </Card>
                    </div>
                    
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </Modal>
    );
};

export default EditComponent;
