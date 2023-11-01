package com.example.mcqprojectbackend.model;
import javax.persistence.*;

/*********************************** Question ************************************/
/*                                                                               */
/*  Long   id         Corresponds to the primary key of the database.            */
/*                    auto-incrementing                                          */
/*                                                                               */
/*  String question;  This is a string used to store an array of options.        */
/*                    It is the serialized json array.                           */
/*                                                                               */
/*  String type;      Single choice, multiple choice, or short answer questions. */
/*                                                                               */
/*  String body;      Used to store the options of multiple choice questions.    */
/*                    It is a serialized json array.                             */
/*                                                                               */
/*  String answer;    The answer of this question.                               */
/*                                                                               */
/*  Long correct;     The number of correct answer.                              */
/*                                                                               */
/*  Long wrong;       The number of wrong answer.                                */
/*                                                                               */
/*  String point;     question score.                                            */
/*                                                                               */
/*********************************************************************************/

@Entity
@Table(name = "question_table")
public class Question
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "question")
    private String question;
    @Column(name = "style")
    private String style;
    @Column(name = "body")
    private String body;
    @Column(name = "answer")
    private String answer;
    @Column(name = "correct")
    private Long correct;
    @Column(name = "wrong")
    private Long wrong;
    @Column(name = "point")
    private Integer point;
    @Column(name = "time")
    private Integer time;
    @Column(name = "create_time")
    private String createTime;
    @Column(name = "update_time")
    private String updateTime;

    // Constructor
    public Question() {
    }

    public Question(Long id, String question, String style, String body, String answer, Long correct, Long wrong, Integer point, Integer time, String createTime, String updateTime) {
        this.id = id;
        this.question = question;
        this.style = style;
        this.body = body;
        this.answer = answer;
        this.correct = correct;
        this.wrong = wrong;
        this.point = point;
        this.time = time;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Question(Question question)
    {
        this.id = question.id;
        this.question = question.question;
        this.style = question.style;
        this.body = question.body;
        this.correct = question.correct;
        this.wrong = question.wrong;
        this.point = question.point;
        this.time = question.time;
        this.createTime = question.createTime;
        this.updateTime = question.updateTime;
    }

    // getter and setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String type) {
        this.style = type;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Long getCorrect() {
        return correct;
    }

    public void setCorrect(Long correct) {
        this.correct = correct;
    }

    public Long getWrong() {
        return wrong;
    }

    public void setWrong(Long wrong) {
        this.wrong = wrong;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public String getCreateTime() {
        return createTime;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    // for update
    public void update(Question question)
    {
        if(question.getQuestion() != null)
        {
            this.question = question.getQuestion();
        }
        if(question.getBody() != null)
        {
            this.body = question.getBody();
        }
        if(question.getStyle() != null)
        {
            this.style = question.getStyle();
        }
        if(question.getAnswer() != null)
        {
            this.answer = question.getAnswer();
        }
        if(question.getPoint() != null)
        {
            this.point = question.getPoint();
        }
        if(question.getTime() != null)
        {
            this.time = question.getTime();
        }
    }

    public Integer check(String answer)
    {
        if(answer.equals(this.answer))
        {
            this.correct++;
            return this.point;
        }
        else
        {
            this.wrong++;
            return 0;
        }
    }
}
