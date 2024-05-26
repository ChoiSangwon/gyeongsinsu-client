import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ArticleDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [post, setPost] = useState(state?.post);
    const [posts, setPosts] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        if (!post) {
            fetchData();
        }
    }, [post]);

    useEffect(() => {
        if (post) {
            const currentUrl = new URL(window.location.href);
            currentUrl.pathname = `/article/${post.link.split("/").pop()}`;
            window.history.replaceState(null, "", currentUrl.toString());
        }
    }, [post]);

    const fetchData = async () => {
        const currentUrl = new URL(window.location.href);
        const date = currentUrl.searchParams.get("date");

        const baseUrl = `${process.env.REACT_APP_API}news`;
        const params = {
            path: "news",
            date: date,
        };

        const url = new URL(baseUrl);
        Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

        try {
            const response = await fetch(url, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            if (data.statusCode === 500) {
                alert("데이터를 가져오는데 실패했습니다.");
                setPosts([]);
                return;
            }
            setPosts(data.body);
            const id = window.location.pathname.split("/").pop();
            const post = data.body.find((post) => post.link.split("/").pop() === id);
            setPost(post);
        } catch (error) {
            alert("데이터를 가져오는데 실패했습니다.");
            setPosts([]);
            console.error("Error fetching data:", error);
        }
    };

    const handleNextArticle = async () => {
        if (posts.length === 0) await fetchData();

        if (posts.length > 0) {
            const nextIndex = posts.findIndex((currentPost) => currentPost.link === post.link) + 1;
            if (nextIndex < posts.length) {
                const post = posts[nextIndex];
                setPost(post);
            } else {
                alert("마지막 글입니다.");
            }
        }
    };

    const handlePrevArticle = async () => {
        if (posts.length === 0) await fetchData();

        if (posts.length > 0) {
            const prevIndex = posts.findIndex((currentPost) => currentPost.link === post.link) - 1;
            if (prevIndex >= 0) {
                const post = posts[prevIndex];
                setPost(post);
            } else {
                alert("첫 번째 글입니다.");
            }
        }
    };

    const handleArticleList = async () => {
        if (posts.length === 0) await fetchData();
        setDropdownVisible((prev) => !prev);
    };

    const DropdownWrapper = () => {
        const handleCloseDropdown = () => {
            setDropdownVisible(false);
        };
        return (
            <DropdownContainer>
                <DropdownHeader>
                    <div style={{ fontSize: 14, color: "#ffffff", fontWeight: "bold" }}>목록</div>
                    <CloseButton onClick={handleCloseDropdown}>닫기</CloseButton>
                </DropdownHeader>
                <Dropdown>
                    {posts.map((post, index) => (
                        <DropdownItem key={index} onClick={() => navigate(`/article/${post.link.split("/").pop()}`, { state: { post } })}>
                            {post.title}
                        </DropdownItem>
                    ))}
                </Dropdown>
            </DropdownContainer>
        );
    };

    return (
        <div style={{ height: "100vh" }}>
            <Header handleArticleList={handleArticleList} handleNextArticle={handleNextArticle} handlePrevArticle={handlePrevArticle} />
            {dropdownVisible && (
                <DropdownWrapper>
                    {posts.map((post, index) => (
                        <DropdownItem key={index} onClick={() => navigate(`/article/${post.link.split("/").pop()}`, { state: { post } })}>
                            {post.title}
                        </DropdownItem>
                    ))}
                </DropdownWrapper>
            )}
            {!post ? (
                <div>Loading...</div>
            ) : (
                <Layout>
                    <MainContent>
                        <Category>{post.category}</Category>
                        <div style={{ height: 40 }}></div>
                        <Title>{post.title}</Title>
                        <div style={{ height: 8 }}></div>
                        <SubTitle
                            props
                            // TODO : location 데이터 받아서 보여주기
                            location={"A1"}
                            date={post.datetime}
                            link={post.link}
                        />
                        <div style={{ height: 24 }}></div>
                        <SummaryContent>
                            <p>{`What: ${post.what}`}</p>
                            <p>{`Why: ${post.why}`}</p>
                            <p>{`How: ${post.how}`}</p>
                        </SummaryContent>
                        <div style={{ height: 80 }}></div>
                        <Feedback />
                        <div style={{ height: 80 }}></div>
                    </MainContent>
                    <Divider />
                    <SubContent>
                        <Title>{"메모장"}</Title>
                        <Memo />
                    </SubContent>
                </Layout>
            )}
        </div>
    );
};

const Header = ({ handleArticleList, handleNextArticle, handlePrevArticle }) => {
    return (
        <div
            style={{
                background: "#474747",
                height: 80,
                alignItems: "center",
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "120px",
            }}
        >
            <div
                style={{
                    fontSize: 16,
                    marginRight: 20,
                    color: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                }}
                onClick={handlePrevArticle}
            >
                <img src="/icons/chevron-left.svg" alt="logo" />
                <p style={{ margin: 0 }}>{"이전글"}</p>
            </div>
            <div
                style={{
                    fontSize: 16,
                    marginRight: 20,
                    color: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                }}
                onClick={handleArticleList}
            >
                <img src="/icons/list.svg" alt="logo" />
                <div width="8px" height="1px" />
                <p position="relative">{"목록"}</p>
            </div>
            <div
                style={{
                    fontSize: 16,
                    marginRight: 20,
                    color: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                }}
                onClick={handleNextArticle}
            >
                <p style={{ margin: 0 }}>{"다음글"}</p>
                <img src="/icons/chevron-right.svg" alt="logo" />
            </div>
        </div>
    );
};

const Memo = () => {
    return <MemoContentTextField placeholder={"이 기사에서 기억하고 싶은 내용을 간단히 메모해보세요!"} />;
};

const SubTitle = ({ location, date, link }) => {
    return (
        <div style={{ display: "flex", alignContent: "center", alignItems: "center" }}>
            <div style={{ fontSize: 14, color: "#ADADAD" }}>{location}면</div>
            <div style={{ width: 8 }}></div>
            <div
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ECECEC",
                }}
            />
            <div style={{ width: 8 }}></div>
            <div style={{ fontSize: 14, color: "#ADADAD" }}>{date}</div>
            <div style={{ width: 8 }}></div>
            <div
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ECECEC",
                }}
            />
            <div style={{ width: 8 }}></div>
            <div
                onClick={() => window.open(link)}
                style={{
                    fontSize: 12,
                    color: "#6C6C6C",
                    borderRadius: "999px",
                    alignContent: "center",
                    border: "1px solid #ececec",
                    padding: "4px 8px",
                    cursor: "pointer",
                }}
            >
                {"기사 원문"}
            </div>
        </div>
    );
};

const Feedback = () => {
    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();

        const feedback = e.target.elements.feedback.value;
        const baseUrl = `${process.env.REACT_APP_API}feedback`;

        const url = new URL(baseUrl);
        const body = {
            path: "feedback",
            feedback: feedback,
            email: "example@gmail.com",
        };
        Object.keys(body).forEach((key) => url.searchParams.append(key, body[key]));
        try {
            const response = await fetch(url, {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            if (data.statusCode === 500) {
                alert("피드백 제출에 실패했습니다.");
                return;
            }
            alert("피드백이 제출되었습니다.");
        } catch (error) {
            alert("피드백 제출에 실패했습니다.");
        }
    };

    const FeedbackForm = () => {
        return (
            <form
                style={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "row",
                    border: "1px solid #b7bfc8",
                    padding: "20px 24px",
                    borderRadius: "12px",
                }}
                onSubmit={handleFeedbackSubmit}
            >
                <FeedbackContentTextField name="feedback" placeholder={"답변을 원하실 경우 이메일 주소도 함께 적어주세요 :)"} />
                <FeedbackSubmitButton type="submit">{"피드백 제출하기"}</FeedbackSubmitButton>
            </form>
        );
    };

    return (
        <div>
            <FeedbackTitle>{"💬 이 기사에 대한 피드백을 남겨주세요!"}</FeedbackTitle>
            <div style={{ height: 16 }}></div>
            <FeedbackForm />
        </div>
    );
};

const FeedbackSubmitButton = styled.button`
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    padding: 0;
`;

const FeedbackTitle = styled.div`
    font-family: "UhBeeSe_hyun", sans-serif;
    font-size: 16px;
    font-weight: 400;
`;

const MainContent = styled.div`
    width: calc(70% - 20px);
    padding: 120px 0;
`;

const Divider = styled.div`
    width: 1px;
    margin: 0 20px;
    color: #cbd5e1;
    background-color: #cbd5e1;
    display: inline-block;
`;

const SubContent = styled.div`
    width: calc(30% - 20px);
    padding: 120px 0;
`;

const Layout = styled.div`
    display: flex;
    padding: 0 120px;
    height: calc(100% - 80px);
`;

const MemoContentTextField = styled.textarea`
    resize: none;
    width: 100%;
    height: 260px;
    border: 1px solid #cbd5e1;
    padding: 16px;
    margin: 0;
    border-radius: 12px;
`;

const FeedbackContentTextField = styled.textarea`
    width: 100%;
    resize: none;
    margin: 0;
    border: none;
    padding: 0;
`;

const SummaryContent = styled.div`
    max-width: 100%;
    border-radius: 12px;
    background: #f7f7f7;
    padding: 20px 24px;
`;

const Category = styled.div`
    padding: 16px 10px;
    background-color: #ffffff;
    color: #000000;
    border-radius: 12px;
    display: inline-block;
    font-size: 16px;
    border: 1px solid #000000;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
`;

const Dropdown = styled.div`
    background: white;
    border: 1px solid #ccc;
    border-radius: 0px 0px 4px 4px;
    max-height: 400px;
    overflow-y: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background: #f0f0f0;
    }
`;

const DropdownContainer = styled.div`
    position: absolute;
    top: 130px;
    right: 120px;
    background: white;
    border-radius: 4px;
    width: 300px;
    max-height: 500px;
    overflow-y: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const DropdownHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background: #868686;
    border-radius: 4px 4px 0px 0px;
`;

const CloseButton = styled.div`
    font-size: 12px;
    color: #ffffff;
    font-weight: 400;
    cursor: pointer;
`;

export default ArticleDetail;
