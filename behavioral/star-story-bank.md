## Story 1: Taking Ownership of a Project or Feature

### Question

Tell me about a time you took ownership of a project or feature.

### Situation

At Intuit, I worked on an experiment related to real-time payments, or RTP, in the unpaid bills experience.

RTP payments were more profitable than next-day payments, so the business goal was to increase user awareness and adoption of RTP. The idea was to show users when a bill might become late unless it was paid instantly.

To determine whether to show that indication, we had to evaluate several conditions: whether the user was before the payment cutoff time, whether the user was eligible for RTP, and whether the vendor was eligible for RTP.

This was a high-traffic bills page, so one of the main technical risks was creating too many API calls or adding noticeable latency to the table.

### Task

I was responsible for owning the frontend side of the project end to end.

That included:

- Writing the frontend architecture.
- Coordinating with backend, product, UX, BI, and the Spend team.
- Implementing the feature across multiple codebases.
- Contributing to the datagrid infrastructure.
- Creating the cell experience in the Spend repo.
- Helping divide frontend work with another team member.
- Opening and monitoring the experiment through IXP and Splunk.
- Making sure the feature shipped behind a feature flag and could be safely reverted.

The expectation was to deliver the feature on time, match the design closely, avoid hurting the performance of a high-traffic page, and monitor the experiment until a product decision could be made.

### Action

I started by clarifying the requirements with product, UX, backend, and BI. I reviewed the Figma designs, mapped the different eligibility and cutoff cases, and pushed back on some edge-case copy where I thought the user experience needed to be clearer.

On the technical side, I wrote the frontend architecture and worked with backend on the design doc. I also operated a dedicated Slack channel with the relevant stakeholders so decisions and blockers were visible.

One important technical decision was how to handle the API calls. Calling all eligibility APIs immediately would have increased the number of requests on a very high-traffic page. I raised that concern and pushed for an order where we first checked the payer-side eligibility before checking the vendor-side eligibility. That increased some latency for the cell, but reduced unnecessary API calls.

Because we knew the RTP indication might load slower than the rest of the table, I chose a non-blocking rendering approach. The table could load normally, and the RTP cell could render with a skeleton until the relevant eligibility data was ready. I communicated this tradeoff to the stakeholders and explained why it was better than blocking the table.

I also contributed to two additional codebases: the datagrid infrastructure and the Spend repo. The infrastructure work made the status-cell configuration more reusable for future vendor-list work.

### Result

The feature shipped as an experiment behind a feature flag.

Technically, the implementation worked: the RTP cell rendered in under two seconds after the initial table load, which addressed one of the main concerns from the Spend team.

From the experiment, RTP adoption increased by about 20% relative to itself. However, next-day payment revenue decreased by a similar amount, so the overall business impact was not positive enough to keep the experience. The experiment was stopped and safely reverted by closing the feature flag.

Even though the experiment did not become a permanent product change, I consider the technical execution successful. We delivered the experiment safely, monitored it, learned from the data, and created reusable infrastructure for future work.

### 2-Minute Version

At Intuit, I owned the frontend side of an experiment to increase real-time payment adoption in the unpaid bills experience.

RTP payments were more profitable, so the business wanted to show users when a bill might become late unless it was paid instantly. To decide whether to show that message, we had to check whether the user was before the cutoff time, whether the user was eligible for RTP, and whether the vendor was eligible.

I owned the frontend architecture and implementation across multiple codebases. I worked with product, UX, backend, BI, and the Spend team, wrote the frontend architecture, contributed to the datagrid infrastructure, implemented the cell experience in the Spend repo, helped divide frontend work, and monitored the experiment through IXP and Splunk.

The biggest technical concern was that the bills page was very high traffic, and the feature could create too many API calls or add latency. I raised that concern and pushed for an API call order where we first checked payer eligibility before checking vendor eligibility. That reduced unnecessary calls, although it meant the cell might load later than the rest of the table.

To protect the user experience, I chose a non-blocking rendering approach. The table loaded normally, and the RTP indication rendered with a skeleton while the eligibility data loaded. I communicated that tradeoff clearly to stakeholders.

The experiment shipped behind a feature flag. Technically, it worked: the cell rendered in under two seconds after the initial table load. Product-wise, RTP adoption increased by about 20% relative to itself, but next-day payment revenue decreased by a similar amount. So the experiment was stopped and safely reverted by closing the feature flag.

The main lesson was that ownership is not only about shipping code. It is also about raising risks early, aligning stakeholders, making tradeoffs explicit, monitoring the outcome, and accepting the data even when the experiment does not become a permanent feature.

### Follow-Up Questions

#### What would you do differently?

I would push earlier for the backend engineer to own and write a more complete backend spec. Some frontend progress depended on backend decisions, and having that clearer earlier would have reduced coordination overhead.

#### What was the hardest part?

The hardest part was coordination. The feature touched multiple codebases and teams, including the Spend team and backend. Time-zone differences and backend availability made alignment harder, so I had to keep communication explicit through meetings, the design doc, and a dedicated Slack channel.

#### How did you align with product, design, and backend?

I used regular syncs with product and backend, weekly meetings with BI and UX, and a shared Slack channel. I also reviewed the Figma designs and edge cases with UX and product to make sure the experience was clear.

#### What technical tradeoff did you make?

The main tradeoff was API call order. We could call all eligibility APIs earlier and reduce latency, but that risked creating too many calls on a high-traffic page. I pushed for checking payer eligibility first and only then checking vendor eligibility. This increased cell loading time somewhat, but reduced unnecessary API calls.

#### How did you know whether it was successful?

We monitored the experiment through IXP and Splunk. Technically, the feature met the performance expectation: the cell rendered in under two seconds after initial load. Product-wise, RTP adoption increased by about 20% relative to itself, but the lift came at the expense of next-day payment revenue, so the experiment was not kept.

### Short lesson

The main lesson from this project was that ownership is not just shipping the code. It also means raising risks early, aligning stakeholders, making tradeoffs explicit, monitoring the result, and accepting the experiment data even when the feature does not become permanent.
