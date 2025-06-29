import { useEffect, useState } from 'react';
import api from "../api/axios";

export default function Subscription() {
  const [plans, setPlans] = useState([]);
  const [myPlan, setMyPlan] = useState(null);
  const token = localStorage.getItem('token');

  const fetchPlans = async () => {
    const res = await api.get('/plans', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPlans(res.data);
    console.log("plans", res.data);
  };

  const fetchMySubscription = async () => {
    const res = await api.get('/my-subscription', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.data) setMyPlan(res.data.subscription_plan.name);
    else setMyPlan('Free');
  };

  const subscribe = async (planId) => {
    await api.post('/subscribe', { subscription_plan_id: planId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Subscribed successfully');
    fetchMySubscription();
  };

  useEffect(() => {
    fetchPlans();
    fetchMySubscription();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Subscription Plans</h3>
      <p>Current Plan: <strong>{myPlan}</strong></p>

      <div className="row mt-4">
        {plans.map(plan => (
          <div key={plan.id} className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{plan?.name}</h5>
                <p className="card-text">Daily Limit: {plan.daily_limit} bookings</p>
                <button className="btn btn-primary" onClick={() => subscribe(plan.id)}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
