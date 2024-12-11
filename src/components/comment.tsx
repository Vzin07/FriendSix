'use client'

import { creatComment } from "@/app/(authenticated)/dashboard/actions";
import { InitialState } from "@/types";
import { ArrowBigRightDash, MessageSquareText, Users, X } from "lucide-react";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { getComments } from "@/app/actions";
import { useRouter } from "next/navigation";

const initialState: InitialState = {
    success: false,
    errors: {},
};

interface CommentProps {
    id: string,
    type: string
}

export default function Comment(props: CommentProps) {
    const [isModalOpenComment, setIsModalOpenComment] = useState(false);
    const [comments, setComments] = useState<any>([])
    const [commentCount, setCommentCount] = useState(0)
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [line, setLine] = useState(true)
    let state = initialState
    const router = useRouter()

    const handleUserClick = (userId: string) => {
        router.push(`/profile/${userId}`);
    };

    const toggleModalComment = () => {
        setIsModalOpenComment(!isModalOpenComment);
    };

    useEffect(() => {
        const commentsOnGroup = async () => {
            const { comments, commentCount } = await getComments(props.id, props.type);
            console.log("Comentários recebidos:", comments);
            setComments(comments)
            setCommentCount(commentCount)
        };

        commentsOnGroup();
    }, [props.id, props.type]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        state = await creatComment(initialState, new FormData(e.target as HTMLFormElement), props.type);

        if (state.success) {
            const { comments, commentCount } = await getComments(props.id, props.type);
            setComments(comments);
            setCommentCount(commentCount);
            setCommentText("");
        } else {
            console.error("Erro ao criar comentário:", state.errors);
        }

        setIsSubmitting(false);
    };

    return (
        <div>
            <div className="flex gap-1">
                <MessageSquareText onClick={toggleModalComment} className="cursor-pointer" />
                <span className="cursor-default">{commentCount}</span>
            </div>

            {isModalOpenComment && (
                <div onClick={toggleModalComment} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                    <div onClick={e => e.stopPropagation()} className="w-full h-96 max-w-md gap-2 bg-orange-300 p-3 rounded-xl shadow-lg flex flex-col items-center">
                        <div
                            onClick={toggleModalComment}
                            className="flex h-7 w-full justify-between"
                        >
                            <div className="flex gap-5">
                                <h1 className="text-3xl">Comments</h1>
                                <span className="text-3xl">{commentCount}</span>
                            </div>

                            <X className="size-8" />
                        </div>

                        <div className="flex flex-col w-full h-72 p-2 overflow-auto rounded-lg bg-black">
                            <div className="w-11/12 flex flex-col gap-1 mt-2">
                                {comments.map((event: {
                                    userId: string; user: { photoProfile: any; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; text: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                                }, index: Key | null | undefined) => (
                                    <div key={index} className="flex flex-col justify-center p-2 border-2 border-solid border-orange-700 rounded-lg bg-white">
                                        <div className="flex">
                                            <div className="aspect-square size-9 rounded-md">
                                                {event.user.photoProfile ? <img src="" alt="" className="object-contain w-full h-full rounded-md" /> : <Users color="black" className="" />}
                                            </div>

                                            <h3 className="font-morsan underline justify-normal text-2xl -mt-1"
                                                onClick={() => handleUserClick(event.userId)}>
                                                {event.user.name}
                                            </h3>
                                        </div>

                                        <div>
                                            <p data-open={line} className="font-morsan text-justify text-lg">
                                                {event.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-auto">
                            <form onSubmit={handleCommentSubmit} className="flex gap-2">
                                {state.errors && (
                                    <p className="text-red-500 text-base mt-1">{state.errors[0]}</p>
                                )}
                                <input onChange={handleCommentChange}
                                    value={commentText}
                                    name="text"
                                    type="text"
                                    placeholder="Comentario"
                                    className="w-96 rounded-xl border-2 border-black p-1 bg-slate-400"
                                    required />

                                <input type="hidden" name="id" value={props.id} />

                                <button
                                    type="submit"
                                    className="rounded-full border-2 border-black">
                                    <ArrowBigRightDash className="size-8" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}