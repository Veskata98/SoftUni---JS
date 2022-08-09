function solution(param) {
  if (param === 'upvote') {
    this.upvotes++;
  } else if (param === 'downvote') {
    this.downvotes++;
  } else if (param === 'score') {
    let result = [];

    let rating = '';

    if (this.upvotes / (this.upvotes + this.downvotes) > 0.66) {
      rating = 'hot';
    } else if (
      this.upvotes >= this.downvotes &&
      this.upvotes + this.downvotes > 100
    ) {
      rating = 'controversial';
    } else if (this.downvotes > this.upvotes) {
      rating = 'unpopular';
    } else {
      rating = 'new';
    }

    if (this.upvotes + this.downvotes < 10) {
      rating = 'new';
    }

    if (this.upvotes + this.downvotes > 50) {
      let biggerValue = Math.ceil(Math.max(this.downvotes, this.upvotes) / 4);

      let reportedUpvotes = this.upvotes + biggerValue;
      let reportedDownvotes = this.downvotes + biggerValue;

      result.push(
        reportedUpvotes,
        reportedDownvotes,
        reportedUpvotes - reportedDownvotes,
        rating
      );
    } else {
      result.push(
        this.upvotes,
        this.downvotes,
        this.upvotes - this.downvotes,
        rating
      );
    }
    return result;
  }
}

let post = {
  id: '1',
  author: 'pesho',
  content: 'hi guys',
  upvotes: 0,
  downvotes: 0,
};

solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
solution.call(post, 'upvote');
//solution.call(post, 'downvote');
let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
console.log(score);
solution.call(post, 'downvote'); // (executed 50 times)
score = solution.call(post, 'score'); // [139, 189, -50, 'unpopular']
