# Rate Limiter and Load Balancer

A very basic implementation of load balancer and rate limiter using NodeJs

For load balancing, there are three servers, one load balance and two other sub servers. The load balancer will take in the request and assign sub servers based on a round robin algorithm

The load balancers are connected to a rate limiter which follows a token bucket algorithm in which 4 tokens are there and each request occupies a token and requests are allowed until the tokens exhaust. The tokens are reset every 5 seconds

We can assume that each user comes with an individual userId(right now send as payload). So each userId will have 4 tokens. And a setTimeout() will refill their tokens every 5 seconds
