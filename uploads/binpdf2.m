function binpdf2()


    function x = sample_configs(p,n)
        if nargin == 1
            n = 1;
        end
        k = length(p);
        p = reshape(p,k,1);
        
        x = sum(repmat(rand(1,n),k,1)> repmat(cumsum(p)/sum(p),1,n),1)+1;
    end



numparticles = 13

xvals = 0:1:numparticles;
reps = 100;
yval = binopdf(xvals,numparticles,(pi/9));
[i,j] = max(yval);
bin_inside = j-1
halfway_point = (bin_inside + floor((numparticles - bin_inside)/2) -1);
eq_dist = dlmread('eq.txt')
eq_dist0 = eq_dist(1:(bin_inside*reps),:);
eq_dist1 = eq_dist(((bin_inside)*reps)+1:(halfway_point*reps),:);
eq_dist2 = eq_dist((halfway_point*reps)+1:end,:);


reps1 = 1000;
reps2 = 100;
nbin1 = 2;
nbin2 = length(3:bin_inside) + 2;

[i,j] = max(yval);
yv = yval(2:end)/sum(yval(2:end))
yv = repmat(yv/reps,reps ,1)
yv = reshape(yv,[numparticles*reps 1])
yv0 = yv(1:(bin_inside*reps),:);
yv1 = yv(((bin_inside)*reps)+1:(halfway_point*reps),:);
yv2 = yv((halfway_point*reps)+1:end,:)






x1 = sample_configs(yv1/sum(yv1),100)
x2 = sample_configs(yv2/sum(yv2),100)

zv1 = yv1(x1,:);
zv2 = yv2(x2,:);
eq_dist1a = eq_dist1(x1,:);
eq_dist2a = eq_dist2(x2,:);


new_coords = [eq_dist0; eq_dist1a; eq_dist2a];
new_weights = [yv0; zv1; zv2];

dlmwrite('weight.txt',new_weights);
dlmwrite('eq2.txt',new_coords);

end