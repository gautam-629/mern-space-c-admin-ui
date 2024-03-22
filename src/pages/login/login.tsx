import { Layout, Card, Space, Form, Input, Checkbox, Button, Flex } from 'antd';
import { LockFilled, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { login, logout, self } from '../../http/api';
import Logo from '../../components/icons/Logo';
import { Credentials } from '../../type';
import { useAuthStore } from "../../store";
import { userPermission } from '../../hooks/usePermission';


const loginUser = async (credentials: Credentials) => {
    const { data } = await login(credentials);
    return data;
};

const getSelf = async () => {
    const { data } = await self();
    return data;
};


const LoginPage = () => {

    const { isAllowed } = userPermission();
    const { setUser, logout: logoutFromStore } = useAuthStore();

    const { refetch } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        enabled: false,
    });

    const { mutate: logoutMutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logout,
        onSuccess: () => {
            logoutFromStore()
            return;
        }
    })
    
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
            // logout or redirect to client ui
            // window.location.href = "http://clientui/url"
            // "admin", "manager", "customer"

            if (!isAllowed(selfDataPromise?.data)) {
                logoutMutate();
                return;
            }

            setUser(selfDataPromise.data);
        },

    });

    return (
        <>
            <Layout style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                <Space direction="vertical" align="center" size="large">
                    <Layout.Content
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Logo />
                    </Layout.Content>
                    <Card
                        bordered={false}
                        style={{ width: 300 }}
                        title={
                            <Space
                                style={{ width: '100%', fontSize: 16, justifyContent: 'center' }}>
                                <LockFilled />
                                Sign in
                            </Space>
                        }>
                        <Form
                            onFinish={(values) => {
                                mutate({ email: values.username, password: values.password });
                            }}

                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email is not valid',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password',
                                    },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>
                            <Flex justify="space-between">
                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a href="" id="login-form-forgot">
                                    Forgot password
                                </a>
                            </Flex>
                            <Form.Item>
                                <Button
                                    loading={isPending}
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%' }} >
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>

                    </Card>
                </Space>
            </Layout>
        </>
    )
}

export default LoginPage;

